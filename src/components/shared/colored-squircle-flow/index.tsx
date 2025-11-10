"use client";

import { useEffect, useRef } from "react";

type SquircleParticle = {
  x: number;
  y: number;
  baseY: number;
  size: number;
  hue: number;
  speed: number;
  startTime: number;
  amplitude: number;
  frequency: number;
  phase: number;
};

export const ColoredSquircleFlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<SquircleParticle[]>([]);
  const animationRef = useRef<number | null>(null);
  const animateFnRef = useRef<(() => void) | null>(null);
  const canvasSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvasContainerRef.current;

    if (!canvas || !container) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }
    contextRef.current = ctx;

    const resizeCanvas = () => {
      const w = Math.max(1, container.offsetWidth);
      const h = Math.max(1, container.offsetHeight);
      canvasSizeRef.current.w = w;
      canvasSizeRef.current.h = h;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      if (particlesRef.current.length === 0) {
        particlesRef.current = createSquircles(w, h);
      }
    };

    const createSquircles = (
      width: number,
      height: number
    ): SquircleParticle[] => {
      const squircles: SquircleParticle[] = [];

      for (let i = 0; i < 8; i++) {
        squircles.push({
          x: width + Math.random() * width,
          y: Math.random() * height,
          baseY: Math.random() * height,
          size: 80,
          hue: Math.floor(Math.random() * 360),
          speed: Math.random() * 0.3 + 0.2,
          startTime: Date.now() + Math.random() * 5000,
          amplitude: 3 + Math.random() * 5,
          frequency: 0.0005 + Math.random() * 0.0007,
          phase: Math.random() * Math.PI * 2
        });
      }
      return squircles;
    };

    const drawSquircle = (x: number, y: number, size: number) => {
      const a = size / 2;
      const m = 4;
      const step = 0.01;
      let started = false;
      ctx.beginPath();

      for (let t = 0; t <= Math.PI * 2 + step; t += step) {
        const c = Math.cos(t);
        const s = Math.sin(t);
        const px = x + a * Math.sign(c) * Math.abs(c) ** (2 / m);
        const py = y + a * Math.sign(s) * Math.abs(s) ** (2 / m);

        if (!started) {
          ctx.moveTo(px, py);
          started = true;
        } else {
          ctx.lineTo(px, py);
        }
      }
      ctx.closePath();
    };

    const animate = () => {
      const ctx2 = contextRef.current;

      if (!ctx2) {
        return;
      }

      const width = canvasSizeRef.current.w;
      const height = canvasSizeRef.current.h;
      ctx2.clearRect(0, 0, width, height);

      const now = Date.now();

      particlesRef.current.forEach((squircle: SquircleParticle) => {
        if (now < squircle.startTime) {
          return;
        }

        squircle.x -= squircle.speed;

        if (squircle.x < -squircle.size) {
          squircle.x = width + squircle.size;
          squircle.y = Math.random() * height;
          squircle.baseY = squircle.y;
          squircle.hue = Math.floor(Math.random() * 360);
          squircle.amplitude = 3 + Math.random() * 5;
          squircle.frequency = 0.0005 + Math.random() * 0.0007;
          squircle.phase = Math.random() * Math.PI * 2;
        }

        const progress = Math.max(0, Math.min(1, 1 - squircle.x / width));
        const scale = 0.4 + progress * 0.6;
        const adjustedSize = Math.min(squircle.size * scale, 100);
        const wave =
          squircle.amplitude *
          Math.sin(now * squircle.frequency + squircle.phase);

        const xWobble =
          squircle.amplitude *
          0.2 *
          Math.cos(now * (squircle.frequency * 0.8) + squircle.phase);

        const drawX = squircle.x + xWobble;
        const adjustedY = squircle.baseY + wave + height * 0.1 * progress;

        ctx2.save();
        ctx2.fillStyle = `hsl(${squircle.hue}, 90%, 60%)`;
        ctx2.shadowColor = "hsla(0 0% 0% / 0.25)";
        ctx2.shadowBlur = 4;
        ctx2.shadowOffsetX = 0;
        ctx2.shadowOffsetY = 1;
        drawSquircle(drawX, adjustedY, adjustedSize);
        ctx2.fill();
        ctx2.restore();

        const distance = adjustedSize * 0.9;
        const angle = Math.PI / 4;
        const endX = drawX + Math.cos(angle) * distance;
        const endY = adjustedY - Math.sin(angle) * distance;

        ctx2.lineCap = "round";
        ctx2.lineWidth = 2 * scale;
        ctx2.strokeStyle = "hsl(0 0% 100%)";
        ctx2.beginPath();
        ctx2.moveTo(drawX, adjustedY);
        ctx2.lineTo(endX, endY);
        ctx2.stroke();

        ctx2.beginPath();
        ctx2.arc(drawX, adjustedY, 5 * scale, 0, Math.PI * 2);
        ctx2.fillStyle = "hsl(0 0% 100%)";
        ctx2.fill();

        ctx2.font = `600 ${16 * scale}px "DM Mono", monospace, system-ui`;
        ctx2.fillStyle = "hsl(0 0% 100%)";
        ctx2.textAlign = "left";
        ctx2.textBaseline = "middle";
        ctx2.fillText(`HUE: ${squircle.hue}`, endX + 12 * scale, endY);
      });

      const gradX = contextRef.current?.createLinearGradient(0, 0, width, 0);

      if (gradX && contextRef.current) {
        gradX.addColorStop(0, "hsla(0 0% 0% / 0)");
        gradX.addColorStop(0.1, "hsla(0 0% 0% / 1)");
        gradX.addColorStop(0.9, "hsla(0 0% 0% / 1)");
        gradX.addColorStop(1, "hsla(0 0% 0% / 0)");

        contextRef.current.globalCompositeOperation = "destination-in";
        contextRef.current.fillStyle = gradX;
        contextRef.current.fillRect(0, 0, width, height);
      }

      const gradY = contextRef.current?.createLinearGradient(0, 0, 0, height);

      if (gradY && contextRef.current) {
        gradY.addColorStop(0, "hsla(0 0% 0% / 0)");
        gradY.addColorStop(0.1, "hsla(0 0% 0% / 1)");
        gradY.addColorStop(0.9, "hsla(0 0% 0% / 1)");
        gradY.addColorStop(1, "hsla(0 0% 0% / 0)");

        contextRef.current.fillStyle = gradY;
        contextRef.current.fillRect(0, 0, width, height);
        contextRef.current.globalCompositeOperation = "source-over";
      }

      animationRef.current = requestAnimationFrame(
        animateFnRef.current as () => void
      );
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    animateFnRef.current = animate;
    animateFnRef.current();

    return () => {
      window.removeEventListener("resize", resizeCanvas);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dpr]);

  return (
    <div
      className="colored-squircle-flow"
      ref={canvasContainerRef}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};
