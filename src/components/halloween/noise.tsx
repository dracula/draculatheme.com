"use client";

import * as React from "react";

export const Noise: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationRef = React.useRef<number>(null);

  const snow = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    const imageData = ctx.createImageData(w, h);
    const buffer = new Uint32Array(imageData.data.buffer);
    const len = buffer.length;

    for (let i = 0; i < len; i++) {
      buffer[i] = (0x3c2017 << 8) | (Math.random() * 255);
    }

    ctx.putImageData(imageData, 0, 0);
  }, []);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    const ww = window.innerWidth;
    canvas.width = ww / 3;
    canvas.height = (ww * 0.5625) / 3;

    const animate = () => {
      snow();
      animationRef.current = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
          } else {
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
            }
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [snow]);

  return <canvas ref={canvasRef} className="noise" id="canvas" />;
};
