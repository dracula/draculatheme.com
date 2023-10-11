import { CSSProperties } from "react";

interface ExtendedCSSProperties extends CSSProperties {
  [key: string]: any;
}

const ColorPicker = ({ colorMap, variant, setVariant }) => (
  <div className="color-picker">
    <ul className="list">
      {colorMap.map((color, index) => (
        <li
          key={index}
          className={variant === index ? "is-active" : ""}
          onClick={() => setVariant(index)}
          style={{ "--color": color.value } as ExtendedCSSProperties}
        >
          <span className="preview" />
          <p className="name">{color.name}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default ColorPicker;
