import "./index.scss";
import Image from "next/image";
import CardPlain from "../../wrappers/cardPlain";

const Alucard = () => {
  return (
    <article className="alucard">
      <CardPlain>
        <div className="col content">
          <span className="title s">Our First Light Theme</span>
          <div className="text">
            <p>
              This light theme isn&apos;t just a matter of preference; it&apos;s
              essential for accessibility and usability in bright conditions,
              accommodating visually impaired users and ensuring readability.
            </p>
            <p>
              Alucard maintains visual consistency with other Dracula variants,
              making it easy to switch between dark and light themes. Ideal for
              bright environments or developers who prefer light themes, Alucard
              meets WCAG AA contrast standards, reflecting our meticulous
              approach to accessibility through multiple iterations and
              refinements.
            </p>
          </div>
        </div>
        <div className="col bg" />
      </CardPlain>
    </article>
  );
};

export default Alucard;
