"use client";

import { useState } from "react";

export const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      className="action copy-button"
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <title className="sr-only">Copied!</title>
          <path
            d="M20 6L9 17L4 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <title className="sr-only">Copy to clipboard</title>
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
