import Link from "next/link";

export const metadata = {
  title: "🥲 Not found",
  description: "The page you are looking for does not exist."
};

const NotFoundPage = () => (
  <section className="container not-found">
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

export default NotFoundPage;
