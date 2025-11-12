"use client";

import "./index.css";

import { useState } from "react";

import { TickIcon } from "@/icons/tick";

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1998);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className={`action copy-button${copied ? " copied" : ""}`}
    >
      {copied ? (
        <TickIcon className="tick" size={14} />
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <title>Copy to clipboard</title>
          <rect
            x="9"
            y="9"
            width="13"
            height="13"
            rx="2"
            ry="2"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      )}
    </button>
  );
};
