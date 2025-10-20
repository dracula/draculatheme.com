"use client";

import { useEffect, useRef } from "react";

export const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const characters: string[] =
      "田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑ॐ".split(
        ""
      );

    const fontSize = 14;
    let animationId: number;
    let columns: number;
    let drops: number[];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(1);
    };

    const draw = () => {
      context.fillStyle = "rgba(0, 0, 0, 0.024)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.fillStyle = "#ffffff";
      context.font = `${fontSize}px "DM Mono", monospace, system-ui`;

      for (let columnIndex = 0; columnIndex < drops.length; columnIndex++) {
        const randomCharacter =
          characters[Math.floor(Math.random() * characters.length)];
        const xPosition = columnIndex * fontSize;
        const yPosition = drops[columnIndex] * fontSize;

        context.fillText(randomCharacter, xPosition, yPosition);

        if (yPosition > canvas.height && Math.random() > 0.975) {
          drops[columnIndex] = 0;
        }

        drops[columnIndex]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="matrix-rain">
      <canvas ref={canvasRef} />
    </div>
  );
};
