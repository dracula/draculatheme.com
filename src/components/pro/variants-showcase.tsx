"use client";

import Image from "next/image";
import { type SetStateAction, useEffect, useId, useRef, useState } from "react";
import useSound from "use-sound";

import { apps } from "@/lib/pro/apps";

const variants = [
  { name: "Pro", value: "var(--purple)", sound: "/sounds/pro/dracula.mp3" },
  { name: "Blade", value: "var(--green)", sound: "/sounds/pro/blade.mp3" },
  { name: "Buffy", value: "var(--pink)", sound: "/sounds/pro/buffy.mp3" },
  { name: "Lincoln", value: "var(--yellow)", sound: "/sounds/pro/lincoln.mp3" },
  { name: "Morbius", value: "var(--red)", sound: "/sounds/pro/morbius.mp3" },
  {
    name: "Van Helsing",
    value: "var(--cyan)",
    sound: "/sounds/pro/van-helsing.mp3"
  },
  {
    name: "Alucard",
    value: "var(--color-display)",
    sound: "/sounds/pro/alucard.mp3"
  }
];

const soundConfig = { volume: 0.12, preload: false };

export const VariantsShowcase = () => {
  const [selectedAppIndex, setSelectedAppIndex] = useState(
    Math.max(0, apps.length - 4)
  );
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const hasMountedRef = useRef(false);
  const appSelectId = useId();

  const selectedApp = apps[selectedAppIndex];
  const selectedVariant = variants[selectedVariantIndex];

  const [playVariantSound, { sound: activeSound }] = useSound(
    selectedVariant.sound,
    soundConfig
  );

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    playVariantSound();
  }, [playVariantSound]);

  useEffect(
    () => () => {
      activeSound?.unload();
    },
    [activeSound]
  );

  const getVariantSlug = (name: string) => {
    return name.replace(/\s+/g, "-").toLowerCase();
  };

  const handleAppChange = (e: {
    target: { selectedIndex: SetStateAction<number> };
  }) => {
    setSelectedAppIndex(e.target.selectedIndex);
  };

  const handleVariantChange = (index: SetStateAction<number>) => {
    const newIndex =
      typeof index === "function" ? index(selectedVariantIndex) : index;
    setSelectedVariantIndex(newIndex);
  };

  return (
    <div className="variants-showcase">
      <div className="header">
        <h3>Available Everywhere</h3>
        <p>Dracula Pro is built for your favorite apps.</p>
      </div>
      <div className="controls">
        <label htmlFor={appSelectId} className="sr-only">
          Select an app
        </label>
        <select
          id={appSelectId}
          name="app"
          value={selectedApp?.value || ""}
          onChange={handleAppChange}
        >
          {apps.map((app) => (
            <option key={app.value} value={app.value}>
              {app.label}
            </option>
          ))}
        </select>
        <div className="variants">
          {variants.map((variant, index) => (
            <label
              key={variant.name}
              className={`variant ${getVariantSlug(variant.name)}`}
            >
              <input
                type="radio"
                name="variant"
                value={variant.name}
                checked={selectedVariantIndex === index}
                onChange={() => handleVariantChange(index)}
              />
              <div
                className="color"
                style={{ "--color": variant.value } as React.CSSProperties}
              />
              <span>{variant.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="preview">
        <Image
          src={`/images/pro/${selectedApp?.value}/${selectedVariantIndex + 1}.png`}
          alt={`${selectedApp?.label} - ${selectedVariant.name} theme preview`}
          width={912}
          height={552}
          quality={100}
          priority
        />
      </div>
      <div className="illustration">
        <Image
          src={`/images/pro/${getVariantSlug(selectedVariant.name)}.svg`}
          alt={`${selectedVariant.name} illustration`}
          width={918}
          height={1062}
          quality={100}
          priority
        />
      </div>
    </div>
  );
};
