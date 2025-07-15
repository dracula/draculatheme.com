"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { CopyButton } from "@/components/shared/copy-button";

type ColorFormat = (typeof formats)[number];

type ThemeName = "Dracula" | "Alucard";

type Color = {
  name: string;
  hex: string;
  RGB: string;
  HSL: string;
  Ansi16: string;
  Ansi256: string;
};

const formats = ["Hex", "RGB", "HSL", "Ansi16", "Ansi256"];

const draculaColors = [
  {
    name: "Background",
    hex: "#282A36",
    RGB: "RGB(40, 42, 54)",
    HSL: "HSL(231, 15, 18)",
    Ansi16: "30",
    Ansi256: "59"
  },
  {
    name: "Current Line",
    hex: "#44475A",
    RGB: "RGB(68, 71, 90)",
    HSL: "HSL(232, 14, 31)",
    Ansi16: "30",
    Ansi256: "60"
  },
  {
    name: "Selection",
    hex: "#44475A",
    RGB: "RGB(68, 71, 90)",
    HSL: "HSL(232, 14, 31)",
    Ansi16: "30",
    Ansi256: "60"
  },
  {
    name: "Foreground",
    hex: "#F8F8F2",
    RGB: "RGB(248, 248, 242)",
    HSL: "HSL(60, 30, 96)",
    Ansi16: "97",
    Ansi256: "231"
  },
  {
    name: "Comment",
    hex: "#6272A4",
    RGB: "RGB(98, 114, 164)",
    HSL: "HSL(225, 27, 51)",
    Ansi16: "34",
    Ansi256: "103"
  },
  {
    name: "Red",
    hex: "#FF5555",
    RGB: "RGB(255, 85, 85)",
    HSL: "HSL(0, 100, 67)",
    Ansi16: "91",
    Ansi256: "210"
  },
  {
    name: "Orange",
    hex: "#FFB86C",
    RGB: "RGB(255, 184, 108)",
    HSL: "HSL(31, 100, 71)",
    Ansi16: "93",
    Ansi256: "222"
  },
  {
    name: "Yellow",
    hex: "#F1FA8C",
    RGB: "RGB(241, 250, 140)",
    HSL: "HSL(65, 92, 76)",
    Ansi16: "97",
    Ansi256: "229"
  },
  {
    name: "Green",
    hex: "#50FA7B",
    RGB: "RGB(80, 250, 123)",
    HSL: "HSL(135, 94, 65)",
    Ansi16: "92",
    Ansi256: "120"
  },
  {
    name: "Cyan",
    hex: "#8BE9FD",
    RGB: "RGB(139, 233, 253)",
    HSL: "HSL(191, 97, 77)",
    Ansi16: "97",
    Ansi256: "159"
  },
  {
    name: "Purple",
    hex: "#BD93F9",
    RGB: "RGB(189, 147, 249)",
    HSL: "HSL(265, 89, 78)",
    Ansi16: "97",
    Ansi256: "183"
  },
  {
    name: "Pink",
    hex: "#FF79C6",
    RGB: "RGB(255, 121, 198)",
    HSL: "HSL(326, 100, 74)",
    Ansi16: "95",
    Ansi256: "212"
  }
];

const alucardColors = [
  {
    name: "Background",
    hex: "#FFFBEB",
    RGB: "RGB(255, 251, 235)",
    HSL: "HSL(48, 100, 96)",
    Ansi16: "97",
    Ansi256: "231"
  },
  {
    name: "Current Line",
    hex: "#6C664B",
    RGB: "RGB(108, 102, 75)",
    HSL: "HSL(49, 18, 36)",
    Ansi16: "93",
    Ansi256: "100"
  },
  {
    name: "Selection",
    hex: "#CFCFDE",
    RGB: "RGB(207, 207, 222)",
    HSL: "HSL(240, 18, 84)",
    Ansi16: "97",
    Ansi256: "253"
  },
  {
    name: "Foreground",
    hex: "#1F1F1F",
    RGB: "RGB(31, 31, 31)",
    HSL: "HSL(0, 0, 12)",
    Ansi16: "30",
    Ansi256: "16"
  },
  {
    name: "Comment",
    hex: "#6C664B",
    RGB: "RGB(108, 102, 75)",
    HSL: "HSL(49, 18, 36)",
    Ansi16: "93",
    Ansi256: "100"
  },
  {
    name: "Red",
    hex: "#CB3A2A",
    RGB: "RGB(203, 58, 42)",
    HSL: "HSL(6, 66, 48)",
    Ansi16: "91",
    Ansi256: "160"
  },
  {
    name: "Orange",
    hex: "#A34D14",
    RGB: "RGB(163, 77, 20)",
    HSL: "HSL(24, 78, 36)",
    Ansi16: "93",
    Ansi256: "130"
  },
  {
    name: "Yellow",
    hex: "#846E15",
    RGB: "RGB(132, 110, 21)",
    HSL: "HSL(48, 73, 30)",
    Ansi16: "93",
    Ansi256: "100"
  },
  {
    name: "Green",
    hex: "#14710A",
    RGB: "RGB(20, 113, 10)",
    HSL: "HSL(114, 84, 24)",
    Ansi16: "32",
    Ansi256: "22"
  },
  {
    name: "Cyan",
    hex: "#036A96",
    RGB: "RGB(3, 106, 150)",
    HSL: "HSL(198, 96, 30)",
    Ansi16: "36",
    Ansi256: "25"
  },
  {
    name: "Purple",
    hex: "#644AC9",
    RGB: "RGB(100, 74, 201)",
    HSL: "HSL(252, 54, 54)",
    Ansi16: "35",
    Ansi256: "99"
  },
  {
    name: "Pink",
    hex: "#A3144D",
    RGB: "RGB(163, 20, 77)",
    HSL: "HSL(336, 78, 36)",
    Ansi16: "95",
    Ansi256: "125"
  }
];

const getColorByFormat = (color: Color, format: ColorFormat) => {
  switch (format) {
    case "Hex":
      return color.hex;
    case "RGB":
      return color.RGB;
    case "HSL":
      return color.HSL;
    case "Ansi16":
      return color.Ansi16;
    case "Ansi256":
      return color.Ansi256;
    default:
      return color.hex;
  }
};

export const ColorPalette = () => {
  const [selectedFormat, setSelectedFormat] = useState<ColorFormat>("Hex");
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>("Dracula");

  const currentColors =
    selectedTheme === "Dracula" ? draculaColors : alucardColors;

  return (
    <div id="color-palette" className="color-palette">
      <h2>Color Palette</h2>
      <div className="theme-toggle">
        <button
          type="button"
          onClick={() => setSelectedTheme("Dracula")}
          className={selectedTheme === "Dracula" ? "active-theme" : ""}
        >
          Dracula
        </button>
        <button
          type="button"
          onClick={() => setSelectedTheme("Alucard")}
          className={selectedTheme === "Alucard" ? "active-theme" : ""}
        >
          Alucard
        </button>
      </div>
      <ul className="format-options">
        {formats.map((format) => (
          <li key={format}>
            <button
              type="button"
              onClick={() => setSelectedFormat(format)}
              className={selectedFormat === format ? "active-format" : ""}
            >
              {format}
            </button>
            {selectedFormat === format && (
              <motion.span
                layoutId="bubble"
                className="highlighter"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </li>
        ))}
      </ul>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>
                <span>Palette</span>
              </th>
              <th>
                <div className="wrapper">
                  <span>Copy</span>
                </div>
              </th>
              <th>
                <span>Color</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentColors.map((color) => (
              <tr
                key={color.name}
                style={
                  {
                    "--color": getColorByFormat(color, selectedFormat)
                  } as React.CSSProperties
                }
              >
                <td>
                  <span>{color.name}</span>
                </td>
                <td>
                  <CopyButton text={getColorByFormat(color, selectedFormat)} />
                </td>
                <td
                  style={{
                    backgroundColor: getColorByFormat(color, selectedFormat)
                  }}
                  className="color"
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        For more details about how to apply these different colors to represent
        different code symbols, please see the{" "}
        <Link
          href="https://spec.draculatheme.com"
          target="blank"
          className="inline"
        >
          Dracula Specification
        </Link>
        .
      </p>
    </div>
  );
};
