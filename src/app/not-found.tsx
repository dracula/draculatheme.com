import Link from "next/link";

import { ColoredSquircleFlow } from "@/components/shared/colored-squircle-flow";

export const metadata = {
  title: "Not found",
  description: "The page you are looking for does not exist."
};

const NotFoundPage = () => (
  <section className="container not-found">
    <ColoredSquircleFlow />
    <h1>
      <code>0</code>ops
    </h1>
    <p>The crimson moon is up. This page isn’t.</p>
    <p>
      Our nocturnal creature wandered off the map. <br />
      Let’s get you back to safer territory.
    </p>
    <Link href="/" className="action primary">
      Return to the castle
    </Link>
  </section>
);

export default NotFoundPage;
