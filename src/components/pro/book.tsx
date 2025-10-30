import Image from "next/image";

export const Book = () => (
  <div className="book">
    <div className="book-wrapper">
      <div className="cover">
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
    <div className="content">
      <h3>More than a Theme</h3>
      <p>
        You can have the best theme, font, and tooling in the world, but it will
        take a lot of work to <em>reach the next level</em> if you cultivate bad
        habits.
      </p>
      <p>
        That&apos;s why Zeno Rocha reached out to the best professionals he
        knows and asked them for their most valuable tips on{" "}
        <em>being more productive</em>.
      </p>
      <p>
        This book is a collection of valuable learnings from senior
        professionals.
      </p>
      <a
        href="https://14habits.com"
        target="_blank"
        className="action primary cta"
        rel="noreferrer"
      >
        <span>Get a Free Chapter</span>
      </a>
    </div>
  </div>
);
