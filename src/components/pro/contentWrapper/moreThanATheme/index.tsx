import "./index.scss";
import Image from "next/image";
import Link from "next/link";
import CardPlain from "../../wrappers/cardPlain";

const MoreThanATheme = () => {
  return (
    <article className="more-than-a-theme">
      <CardPlain>
        <div className="lx-col is-4 book-wrapper">
          <div className="book">
            <Image
              src="/images/pro/ebook.jpg"
              alt="E-Book"
              width={224}
              height={466}
              quality={100}
              unoptimized={true}
              priority
            />
          </div>
        </div>
        <div className="lx-col content">
          <span className="title s">More than a Theme</span>
          <div className="text">
            <p>
              You can have the best theme, font, and tooling in the world, but
              it will take a lot of work to{" "}
              <span className="highlighted">become a top developer</span> if you
              cultivate bad habits.
            </p>
            <p>
              Because of that, Zeno Rocha decided to reach out to the best
              developers I know and ask them for tips on{" "}
              <span className="highlighted">being more productive</span>.
            </p>
            <p>
              This book is a collection of valuable learnings from senior
              professionals.
            </p>
          </div>
          <Link
            href="https://14habits.com"
            target="_blank"
            className="primary cta"
          >
            <span>Get a Free Chapter</span>
          </Link>
        </div>
      </CardPlain>
    </article>
  );
};

export default MoreThanATheme;
