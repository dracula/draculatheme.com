"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useMousePosition } from "@/hooks/use-mouse-position";

interface Circle {
  alpha: number;
  dx: number;
  dy: number;
  magnetism: number;
  size: number;
  targetAlpha: number;
  translateX: number;
  translateY: number;
  x: number;
  y: number;
}

interface GyroscopeSensor extends EventTarget {
  x: number | null;
  y: number | null;
  z: number | null;
  start: () => void;
  stop: () => void;
}

interface GyroscopeConstructor {
  new (options?: { frequency?: number }): GyroscopeSensor;
}

declare global {
  interface Window {
    Gyroscope?: GyroscopeConstructor;
  }
}

export const Particles = ({
  className = "",
  quantity = 54,
  staticity = 60,
  ease = 60
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<Circle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const gyroscope = useRef<GyroscopeSensor | null>(null);
  const animateRef = useRef<(() => void) | undefined>(undefined);

  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const mousePosition = useMousePosition();
  const [gyroscopeSupported, setGyroscopeSupported] = useState(false);

  const isMobileDevice = useCallback(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const userAgent = navigator.userAgent || "";
    const mobileRegex =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const hasTouchScreen =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;

    return mobileRegex.test(userAgent) || (hasTouchScreen && isSmallScreen);
  }, []);

  const remapValue = useCallback(
    (
      value: number,
      start1: number,
      end1: number,
      start2: number,
      end2: number
    ): number => {
      const remapped =
        ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
      return remapped > 0 ? remapped : 0;
    },
    []
  );

  const resizeCanvas = useCallback(() => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w / 16}rem`;
      canvasRef.current.style.height = `${canvasSize.current.h / 16}rem`;
      context.current.scale(dpr, dpr);
    }
  }, [dpr]);

  const circleParams = useCallback((): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 0.1;
    const alpha = 0;
    const targetAlpha = Number.parseFloat(
      (Math.random() * 0.6 + 0.1).toFixed(1)
    );
    const dx = (Math.random() - 0.5) * 0.2;
    const dy = (Math.random() - 0.5) * 0.2;
    const magnetism = 0.1 + Math.random() * 4;

    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism
    };
  }, []);

  const clearContext = useCallback(() => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  }, []);

  const drawCircle = useCallback(
    (circle: Circle, update = false) => {
      if (context.current) {
        const { x, y, translateX, translateY, size, alpha } = circle;

        context.current.translate(translateX, translateY);
        context.current.beginPath();
        context.current.arc(x, y, size, 0, 2 * Math.PI);
        context.current.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        context.current.fill();
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

        if (!update) {
          circles.current.push(circle);
        }
      }
    },
    [dpr]
  );

  const drawParticles = useCallback(() => {
    clearContext();

    const particleCount = quantity;

    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  }, [circleParams, drawCircle, quantity, clearContext]);

  const initCanvas = useCallback(() => {
    resizeCanvas();
    drawParticles();
  }, [drawParticles, resizeCanvas]);

  const onMouseMove = useCallback(() => {
    if (canvasRef.current && !gyroscopeSupported) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;

      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      } else {
        mouse.current.x = 0;
        mouse.current.y = 0;
      }
    }
  }, [mousePosition, gyroscopeSupported]);

  const animate = useCallback(() => {
    clearContext();
    circles.current.forEach((circle: Circle, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size
      ];

      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = Number.parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );

      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;

        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }

      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease;

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      } else {
        drawCircle(
          {
            ...circle,
            x: circle.x,
            y: circle.y,
            translateX: circle.translateX,
            translateY: circle.translateY,
            alpha: circle.alpha
          },
          true
        );
      }
    });

    if (animateRef.current) {
      window.requestAnimationFrame(animateRef.current);
    }
  }, [clearContext, circleParams, drawCircle, ease, staticity, remapValue]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "Gyroscope" in window &&
      window.Gyroscope &&
      isMobileDevice()
    ) {
      const checkGyroscope = async () => {
        const GyroscopeConstructor = window.Gyroscope;
        if (!GyroscopeConstructor) {
          return;
        }

        try {
          const sensor = new GyroscopeConstructor({ frequency: 60 });

          try {
            const result = await navigator.permissions.query({
              name: "gyroscope" as PermissionName
            });

            if (result.state === "granted") {
              setGyroscopeSupported(true);
            } else if (result.state === "denied") {
              setGyroscopeSupported(false);
            } else if (result.state === "prompt") {
              try {
                await sensor.start();
                sensor.stop();
                setGyroscopeSupported(true);
              } catch {
                setGyroscopeSupported(false);
              }
            }
          } catch {
            try {
              await sensor.start();
              sensor.stop();
              setGyroscopeSupported(true);
            } catch {
              setGyroscopeSupported(false);
            }
          }
        } catch {
          setGyroscopeSupported(false);
        }
      };

      checkGyroscope();
    }
  }, [isMobileDevice]);

  useEffect(() => {
    if (!gyroscopeSupported || !window.Gyroscope) {
      return;
    }

    const initializeGyroscope = async () => {
      const GyroscopeConstructor = window.Gyroscope;
      if (!GyroscopeConstructor) {
        return;
      }

      try {
        const sensor = new GyroscopeConstructor({ frequency: 60 });

        mouse.current.x = 0;
        mouse.current.y = 0;

        sensor.addEventListener("reading", () => {
          if (sensor.x !== null && sensor.y !== null) {
            const sensitivity = 50;
            const targetX = (sensor.y || 0) * sensitivity;
            const targetY = (sensor.x || 0) * sensitivity;

            mouse.current.x += (targetX - mouse.current.x) * 0.1;
            mouse.current.y += (targetY - mouse.current.y) * 0.1;

            const maxOffset = 200;

            mouse.current.x = Math.max(
              -maxOffset,
              Math.min(maxOffset, mouse.current.x)
            );
            mouse.current.y = Math.max(
              -maxOffset,
              Math.min(maxOffset, mouse.current.y)
            );
          }
        });

        await sensor.start();
        gyroscope.current = sensor;
      } catch {
        setGyroscopeSupported(false);
      }
    };

    initializeGyroscope();

    return () => {
      if (gyroscope.current) {
        try {
          gyroscope.current.stop();
        } catch {}
      }
    };
  }, [gyroscopeSupported]);

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }

    initCanvas();

    animateRef.current = animate;
    if (context.current && animateRef.current) {
      animateRef.current();
    }

    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [initCanvas, animate]);

  useEffect(() => {
    onMouseMove();
  }, [onMouseMove]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  return (
    <div
      className={`starry-sky${className ? ` ${className}` : ""}`}
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};
