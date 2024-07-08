"use client";

import "./index.scss";
import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { textStagger } from "src/lib/framerMotion";
import apps from "src/lib/pro";
import CardPlain from "../../wrappers/cardPlain";
import ColorPicker from "./colorPicker";
import SelectComponent from "./select";

const colorMap = [
  {
    name: "Pro",
    value: "var(--purple)"
  },
  {
    name: "Blade",
    value: "var(--green)"
  },
  {
    name: "Buffy",
    value: "var(--pink)"
  },
  {
    name: "Lincoln",
    value: "var(--yellow)"
  },
  {
    name: "Morbius",
    value: "var(--red)"
  },
  {
    name: "Van Helsing",
    value: "var(--cyan)"
  },
  {
    name: "Alucard",
    value: "var(--neutral-01)"
  }
];

const AvailableEverywhere = () => {
  const control = useAnimation();
  const tipRef = useRef(null);
  const inView = useInView(tipRef);

  const articleRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState(
    apps[apps.length - 4] || { value: "", label: "" }
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
          .toLowerCase()}.svg")`
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
            <SelectComponent setSelectedOption={setSelectedOption} />
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
