import "./index.scss";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const PromoBanner = () => {
	return (
		<Link href="/pro" className="promo-banner">
			<span className="container">
				🐰 Happy Easter! Get Dracula PRO for <b>30% OFF</b>
				<ChevronRightIcon size={12} strokeWidth={3} className="icon" />
			</span>
		</Link>
	);
};

export default PromoBanner;
