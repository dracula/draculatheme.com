import Link from "next/link";

export const metadata = {
  title: "🥲 Not found",
  description: "The page you are looking for does not exist."
};

const NotFoundPage = () => (
  <section className="container not-found">
    <h1>Oops!</h1>
    <p>The crimson moon reveals danger...</p>
    <br />
    <p>
      Our nocturnal creature has strayed into the forbidden territories of
      eternal darkness.
    </p>
    <br />
    <Link href="/" className="action primary">
      Return to Castle
    </Link>
  </section>
);

export default NotFoundPage;
