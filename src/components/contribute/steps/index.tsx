"use client";

import Link from "next/link";
import { useState } from "react";
import useSound from "use-sound";

import { copyTemplateIcon } from "./icons/copy-template";
import { submitThemeIcon } from "./icons/submit-theme";
import { useColorsIcon } from "./icons/use-colors";

type IconState = {
  copyTemplate: boolean;
  useColors: boolean;
  submitTheme: boolean;
};

const items = [
  {
    name: "copy-template" as keyof IconState,
    description: (
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
    detailedDescription: (
      <>
        You can do it by cloning the repository or just clicking on &quot;Use
        this template.&quot;
      </>
    ),
    Icon: copyTemplateIcon
  },
  {
    name: "use-colors" as keyof IconState,
    description: (
      <p>
        Build the theme using the
        <br />
        <Link href="#color-palette" className="inline">
          Color Palette
        </Link>{" "}
        below.
      </p>
    ),
    detailedDescription:
      "Edit the template info and upload the file with the theme configs to the repository.",
    Icon: useColorsIcon
  },
  {
    name: "submit-theme" as keyof IconState,
    description: (
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
    detailedDescription:
      "We will move the repo under the Dracula org and give you permissions to maintain it.",
    Icon: submitThemeIcon
  }
];

export const Steps = () => {
  const [iconHovered, setIconHovered] = useState<IconState>({
    copyTemplate: false,
    useColors: false,
    submitTheme: false
  });

  const soundUrl = "/sounds/light-switch.mp3";
  const [play, { stop }] = useSound(soundUrl, { volume: 0.3 });

  const handleMouseOver = (icon: string) => {
    setIconHovered((previousState) => ({ ...previousState, [icon]: true }));
    play();
  };

  const handleMouseOut = (icon: string) => {
    setIconHovered((previousState) => ({ ...previousState, [icon]: false }));
    stop();
  };

  return (
    <div className="steps">
      <h3>How do I submit a new theme?</h3>
      <div className="row">
        {items.map((step, index) => (
          <button
            type="button"
            key={step.name}
            aria-label={`Step 0${index + 1}`}
            onMouseOver={() => handleMouseOver(step.name)}
            onMouseOut={() => handleMouseOut(step.name)}
            onFocus={() => handleMouseOver(step.name)}
            onBlur={() => handleMouseOut(step.name)}
            className="item"
          >
            <div className="box step">
              <span className="index">{index + 1}</span>
              <div className="description">{step.description}</div>
              <step.Icon isHovered={iconHovered[step.name]} />
            </div>
            <div key={`${step.name}-card`} className="box">
              <p className="description">{step.detailedDescription}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
