import "./index.scss";

const Description = () => {
  return (
    <article className="description">
      <div className="text">
        <p>
          Dracula PRO is a color scheme and UI theme{" "}
          <span className="highlighted">tailored for programming</span>.
        </p>
        <p>
          Made for terminal emulators,{" "}
          <span className="highlighted">code editors</span>, and syntax
          highlighters.
        </p>
        <p>
          Designed to be aesthetically pleasing while{" "}
          <span className="highlighted">keeping you focused</span>.
        </p>
      </div>
    </article>
  );
};

export default Description;
