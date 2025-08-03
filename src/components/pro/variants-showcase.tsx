"use client";

import { apps } from "@/lib/pro/apps";
import { type SetStateAction, useState } from "react";
import Image from "next/image";
import useSound from "use-sound";

const variants = [
  { name: "Pro", value: "var(--purple)" },
  { name: "Blade", value: "var(--green)" },
  { name: "Buffy", value: "var(--pink)" },
  { name: "Lincoln", value: "var(--yellow)" },
  { name: "Morbius", value: "var(--red)" },
  { name: "Van Helsing", value: "var(--cyan)" },
  { name: "Alucard", value: "var(--color-display)" }
];

export const VariantsShowcase = () => {
  const [selectedAppIndex, setSelectedAppIndex] = useState(
    Math.max(0, apps.length - 4)
  );
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const selectedApp = apps[selectedAppIndex];
  const selectedVariant = variants[selectedVariantIndex];

  const [playProSound] = useSound("/sounds/pro/dracula.mp3");
  const [playBladeSound] = useSound("/sounds/pro/blade.mp3");
  const [playBuffySound] = useSound("/sounds/pro/buffy.mp3");
  const [playLincolnSound] = useSound("/sounds/pro/lincoln.mp3");
  const [playMorbiusSound] = useSound("/sounds/pro/morbius.mp3");
  const [playVanHelsingSound] = useSound("/sounds/pro/van-helsing.mp3");
  const [playAlucardSound] = useSound("/sounds/pro/alucard.mp3");

  const soundMap = {
    0: playProSound,
    1: playBladeSound,
    2: playBuffySound,
    3: playLincolnSound,
    4: playMorbiusSound,
    5: playVanHelsingSound,
    6: playAlucardSound
  };

  const getVariantSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, "-");
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

    const playSound = soundMap[newIndex as keyof typeof soundMap];
    if (playSound) {
      playSound();
    }
  };

  return (
    <div className="variants-showcase">
      <div className="header">
        <h3>Available Everywhere</h3>
        <p>Dracula PRO is built for your favorite apps.</p>
      </div>
      <div className="controls">
        <select
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
              className={`variant ${variant.name.toLowerCase()}`}
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
