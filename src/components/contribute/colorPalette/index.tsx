"use client";

import "./index.scss";
import { motion } from "framer-motion";
import { ClipboardIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ColorCopyBtn from "./colorCopyBtn";

const formats = ["Hex", "RGB", "HSL", "Ansi16", "Ansi256"];

const colors = [
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
    name: "Cyan",
    hex: "#8BE9FD",
    RGB: "RGB(139, 233, 253)",
    HSL: "HSL(191, 97, 77)",
    Ansi16: "97",
    Ansi256: "159"
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
    name: "Orange",
    hex: "#FFB86C",
    RGB: "RGB(255, 184, 108)",
    HSL: "HSL(31, 100, 71)",
    Ansi16: "93",
    Ansi256: "222"
  },
  {
    name: "Pink",
    hex: "#FF79C6",
    RGB: "RGB(255, 121, 198)",
    HSL: "HSL(326, 100, 74)",
    Ansi16: "95",
    Ansi256: "212"
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
    name: "Red",
    hex: "#FF5555",
    RGB: "RGB(255, 85, 85)",
    HSL: "HSL(0, 100, 67)",
    Ansi16: "91",
    Ansi256: "210"
  },
  {
    name: "Yellow",
    hex: "#F1FA8C",
    RGB: "RGB(241, 250, 140)",
    HSL: "HSL(65, 92, 76)",
    Ansi16: "97",
    Ansi256: "229"
  }
];

const ColorPalette = () => {
  const [selectedFormat, setSelectedFormat] = useState("Hex");

  const getColorByFormat = (color, format) => {
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

  return (
    <div id="color-palette" className="color-palette">
      <h2>Color Palette</h2>
      <ul className="format-options">
        {formats.map((format, index) => (
          <li key={index}>
            <button
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
                  <span className="icon">
                    <ClipboardIcon />
                  </span>
                  <span>Copy</span>
                </div>
              </th>
              <th>
                <span>Color</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {colors.map((color, index) => (
              <tr
                key={index}
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
                  <ColorCopyBtn
                    textToCopy={getColorByFormat(color, selectedFormat)}
                  >
                    <span>{getColorByFormat(color, selectedFormat)}</span>
                  </ColorCopyBtn>
                </td>
                <td
                  style={{
                    backgroundColor: getColorByFormat(color, selectedFormat)
                  }}
                  className="color"
                ></td>
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

export default ColorPalette;
