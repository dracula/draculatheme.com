"use client";

import Link from "next/link";

import { ColoredSquircleFlow } from "@/components/shared/colored-squircle-flow";

const ErrorPage = () => (
  <section className="container not-found">
    <ColoredSquircleFlow />
    <h1>
      <code>0</code>ops
    </h1>
    <p>The crimson moon is up. Something went wrong.</p>
    <p>
      Our nocturnal creature hit a snag. <br />
      Let’s get you back to the castle.
    </p>
    <Link href="/" className="action primary">
      Return to the castle
    </Link>
  </section>
);

export default ErrorPage;
