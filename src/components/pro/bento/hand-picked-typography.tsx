export const HandPickedTypography = () => (
  <div className="card hand-picked-typography">
    <div className="content">
      <h3>Hand-picked Typography</h3>
      <p>
        We have carefully <em>selected four monospaced programming fonts</em>{" "}
        that fit perfectly into Dracula Pro.
      </p>
      <p>
        These fonts have <em>built-in ligature support</em> that improves
        readability. By displaying a shorter glyph instead of 2 or sometimes 3,
        the <em>human brain spends less energy</em> scanning, analysing and
        joining multiple characters into one.
      </p>
      <p>
        <em>Don&apos;t like ligatures?</em> No problem; you can still use these
        fonts.
      </p>
    </div>
    <div className="animation">
      <video
        autoPlay={true}
        controls={false}
        loop={true}
        muted={true}
        playsInline={true}
      >
        <source src="/videos/ligatures.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
);
