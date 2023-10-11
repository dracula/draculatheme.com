"use client";

import "./index.scss";

import { motion, useAnimation, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import CardPlain from "../../wrappers/cardPlain";
import ColorPicker from "./colorPicker";
import Image from "next/image";
import Select from "react-select";
import apps from "src/lib/pro";
import { textStagger } from "src/lib/framerMotion";

const colorMap = [
  {
    name: "Pro",
    value: "var(--purple)",
  },
  {
    name: "Blade",
    value: "var(--green)",
  },
  {
    name: "Buffy",
    value: "var(--pink)",
  },
  {
    name: "Lincoln",
    value: "var(--yellow)",
  },
  {
    name: "Morbius",
    value: "var(--red)",
  },
  {
    name: "Van Helsing",
    value: "var(--cyan)",
  },
  {
    name: "Alucard",
    value: "var(--neutral-01)",
  },
];

const AvailableEverywhere = () => {
  const control = useAnimation();
  const tipRef = useRef(null);
  const inView = useInView(tipRef);

  const articleRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState(
    apps[apps.length - 3] || { value: "", label: "" },
  );

  const [variant, setVariant] = useState(0);

  const setColor = useCallback(() => {
    const color = colorMap[variant] || colorMap[0];

    const articleElement = articleRef.current;

    if (articleElement) {
      articleElement.style.setProperty("--color", color.value);
      articleElement.style.setProperty(
        "--background-image",
        `url("/images/pro/${color.name
          .replace(/\s+/g, "-")
          .toLowerCase()}.svg")`,
      );
    }
  }, [variant]);

  useEffect(() => {
    setColor();
  }, [variant]);

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <article className="available-everywhere" ref={articleRef}>
      <CardPlain>
        <div className="content">
          <div className="title-wrapper">
            <span className="title s">Available Everywhere</span>
            <span>Dracula PRO is built for your favorite apps.</span>
          </div>
          <div className="options-wrapper">
            <motion.span
              ref={tipRef}
              variants={textStagger}
              initial="hidden"
              animate={control}
              exit="exit"
              className="tip"
            >
              Select and see the variants in the apps
            </motion.span>
            <Select
              instanceId={"theme"}
              className="select"
              defaultValue={apps[apps.length - 3]}
              options={apps}
              onChange={(selectedOption) => {
                setSelectedOption(selectedOption);
              }}
              isSearchable={true}
              styles={{
                option: (styles) => ({
                  ...styles,
                  cursor: "pointer",
                  borderRadius: "var(--radius-01)",
                }),
                control: (styles) => ({
                  ...styles,
                  cursor: "pointer",
                  border: ".125rem solid var(--yellow)",
                  borderRadius: "var(--radius-01)",
                }),
                menu: (styles) => ({
                  ...styles,
                  padding: ".5rem",
                  borderRadius: "var(--radius-01)",
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                cursor: "pointer",
                colors: {
                  ...theme.colors,
                  neutral0: "var(--background-color-02)", // Closed - Background
                  neutral10: `var(--yellow)`, // Closed - Arrow
                  neutral20: `var(--yellow)`, // Closed - Border
                  neutral30: `var(--yellow)`, // Closed - Border Hover
                  neutral40: `var(--yellow)`, // Closed - Arrow Hover
                  neutral60: `var(--yellow)`, // Opened - Arrow
                  neutral80: `var(--yellow)`, // Closed - Text
                  primary: `var(--yellow)`, // Opened - Border
                  primary25: "var(--background-color-01)", // Opened - Active
                  primary50: "var(--background-color-01)", // Opened - Focus
                },
              })}
            />
            <ColorPicker
              colorMap={colorMap}
              variant={variant}
              setVariant={setVariant}
            />
          </div>
          <div className="preview-wrapper">
            <Image
              src={`/images/pro/${selectedOption.value}/${variant + 1}.png`}
              alt="Theme Preview"
              width={1000}
              height={1000}
              quality={100}
              unoptimized={true}
              priority
            />
          </div>
        </div>
      </CardPlain>
    </article>
  );
};

export default AvailableEverywhere;
