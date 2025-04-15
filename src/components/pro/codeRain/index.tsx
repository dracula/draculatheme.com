"use client";

import "./index.scss";
import React, { useEffect, useRef } from "react";

const MatrixRain = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const cnvs = canvasRef.current;
		const cntxt = cnvs.getContext("2d");
		const chars: string[] =
			"田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑ॐ".split(
				"",
			);
		const font_size = 14;

		const resizeCanvas = () => {
			cnvs.width = window.innerWidth;
			setTimeout(() => {
				cnvs.height = window.innerHeight;
			}, 0);
		};

		window.addEventListener("resize", resizeCanvas);
		resizeCanvas();

		const columns = Math.max(0, Math.floor(cnvs.width / font_size));
		const drops = Array(columns).fill(1);

		const draw = () => {
			cntxt.fillStyle = "rgba(0,0,0,0.05)";
			cntxt.fillRect(0, 0, cnvs.width, cnvs.height);
			cntxt.fillStyle = "#0F0";
			cntxt.font = `${font_size}px helvetica`;

			for (let i = 0; i < drops.length; i++) {
				const txt = chars[Math.floor(Math.random() * chars.length)];
				cntxt.fillText(txt, i * font_size, drops[i] * font_size);

				if (drops[i] * font_size > cnvs.height && Math.random() > 0.975) {
					drops[i] = 0;
				}

				drops[i]++;
			}
		};

		const intervalId = setInterval(draw, 32);

		return () => {
			clearInterval(intervalId);
			window.removeEventListener("resize", resizeCanvas);
		};
	}, []);

	return (
		<div className="matrix-rain">
			<canvas ref={canvasRef} />
		</div>
	);
};

export default MatrixRain;
