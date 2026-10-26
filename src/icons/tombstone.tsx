import type { IconProperties } from "@/icons/types";

export const TombstoneIcon = ({
  size = 13,
  className = ""
}: IconProperties) => (
  <svg
    className={`icon${className ? ` ${className}` : ""}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    color="currentColor"
    stroke="currentColor"
    aria-hidden="true"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <title>Tombstone Icon</title>
    <path d="M11 10h2" />
    <path d="M19 21V10a7 7 0 00-14 0v11" />
    <path d="M2 21h20" />
    <path d="M9 14h6" />
  </svg>
);
