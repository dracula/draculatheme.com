"use client";

import Link from "next/link";

import { ColoredSquircleFlow } from "@/components/shared/colored-squircle-flow";

const ErrorPage = () => (
  <section className="container not-found">
    <ColoredSquircleFlow />
    <h1>
      <code>0</code>ops!
    </h1>
    <p>The crimson moon reveals danger...</p>
    <p>
      Our nocturnal creature has strayed into <br />
      the forbidden territories of eternal darkness.
    </p>
    <Link href="/" className="action primary">
      Return to Castle
    </Link>
  </section>
);

export default ErrorPage;
