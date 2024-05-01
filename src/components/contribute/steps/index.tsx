"use client";

import "./index.scss";
import Link from "next/link";
import { useState } from "react";
import useSound from "use-sound";
import IconCopyTemplate from "./icons/copyTemplate";
import IconSubmitTheme from "./icons/submitTheme";
import IconUseColors from "./icons/useColors";

const items = [
  {
    name: "copyTemplate",
    desc: (
      <p>
        Create a new repository based on
        <br />
        <Link
          href="https://github.com/dracula/template"
          target="blank"
          className="inline"
        >
          this template.
        </Link>
      </p>
    ),
    descDetailed: (
      <>
        You can do it by cloning the repository or just clicking on &quot;Use
        this template.&quot;
      </>
    ),
    Icon: IconCopyTemplate
  },
  {
    name: "useColors",
    desc: (
      <p>
        Build the theme using the
        <br />
        <Link href="#color-palette" className="inline">
          Color Palette
        </Link>{" "}
        below.
      </p>
    ),
    descDetailed:
      "Edit the template info and upload the file with the theme configs to the repository.",
    Icon: IconUseColors
  },
  {
    name: "submitTheme",
    desc: (
      <p>
        Finally,{" "}
        <Link
          href="https://github.com/dracula/dracula-theme/issues/new"
          target="blank"
          className="inline"
        >
          submit an issue
        </Link>
        <br />
        with a link to your repository.
      </p>
    ),
    descDetailed:
      "We will move the repo under the Dracula org and give you permissions to maintain it.",
    Icon: IconSubmitTheme
  }
];

const Steps = () => {
  const [iconHovered, setIconHovered] = useState({
    copyTemplate: false,
    useColors: false,
    submitTheme: false
  });

  const soundUrl = "/sounds/light-switch.mp3";
  const [play, { stop }] = useSound(soundUrl, { volume: 0.3 });

  const handleMouseOver = (icon) => {
    setIconHovered((prevState) => ({ ...prevState, [icon]: true }));
    play();
  };

  const handleMouseOut = (icon) => {
    setIconHovered((prevState) => ({ ...prevState, [icon]: false }));
    stop();
  };

  return (
    <div className="steps">
      <h2>How do I submit a new theme?</h2>
      <div className="row">
        {items.map((step, index) => (
          <div
            key={index}
            aria-label={`Step 0${index + 1}`}
            onMouseOver={() => handleMouseOver(step.name)}
            onMouseOut={() => handleMouseOut(step.name)}
            className="col"
          >
            <div className="card step">
              <span className="index">{index + 1}</span>
              <div className="desc">{step.desc}</div>
              <step.Icon isHovered={iconHovered[step.name]} />
            </div>
            <div key={index} className="card">
              <span>{step.descDetailed}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
