export const Palette = () => (
  <div className="card palette">
    <div className="content">
      <h3>Geometric Color Palette</h3>
      <p>
        Isaac Newton was <em>one of the first</em> to organize colors
        geometrically.
      </p>
      <p>
        In 1704, He observed the relationships between different wavelengths of
        light and arranged them as a <em>Hue circle</em>, identifying different
        patterns that emerged from this representation. This would become the
        basis of modern color theory.
      </p>
      <p>
        Dracula&apos;s original colors, created in 2013, were based on personal
        taste. This new Pro version brings a more refined and{" "}
        <em>mathematical approach</em> that normalizes luminosity and
        saturation.
      </p>
    </div>
    <div className="illustration">
      <div className="wheel normal" />
      <div className="wheel pro" />
    </div>
  </div>
);
