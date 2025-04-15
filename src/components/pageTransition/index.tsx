"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCallback, useEffect } from "react";
import { fadeInUp } from "src/lib/framerMotion";

const colors = ["180", "115", "35", "330", "250", "10", "60"];
const pathToColor = {
	"/": "250",
	"/about": "180",
	"/blog": "10",
	"/contribute": "35",
	"/pro": "180",
	"/pro/changelog": "115",
	"/shop": "330",
};

const PageTransition = ({ children }) => {
	const pathname = usePathname();

	const setColor = useCallback(() => {
		const color =
			pathToColor[pathname] ||
			colors[Math.floor(Math.random() * colors.length)];
		document.documentElement.style.setProperty("--main-hue", `${color}`);
	}, [pathname]);

	useEffect(() => {
		setColor();
	}, [setColor]);

	return (
		<AnimatePresence>
			<motion.main
				variants={fadeInUp}
				initial="initial"
				animate="animate"
				exit="exit"
			>
				{children}
			</motion.main>
		</AnimatePresence>
	);
};

export default PageTransition;
