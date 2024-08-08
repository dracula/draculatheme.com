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
              For years, we resisted the idea of a light theme for Dracula.
              However, we recognized its importance for accessibility and use in
              bright environments.
            </p>
            <p>
              Alucard, a light variant that seamlessly integrates with Dracula
              PRO, was born. It meets WCAG AA contrast standards, a testament to
              our careful development process that ensures legibility and
              inclusivity.
            </p>
          </div>
        </div>
        <div className="col bg" />
      </CardPlain>
    </article>
  );
};

export default Alucard;
