import type { IconProperties } from "@/icons/types";

export const ArrowUpRight = ({ size = 13, className = "" }: IconProperties) => (
  <svg
    className={`icon${className ? ` ${className}` : ""}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    color="currentColor"
    aria-hidden="true"
  >
    <title>Arrow Up Right Icon</title>
    <path
      d="M17 7L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M11 6.13151C11 6.13151 16.6335 5.65662 17.4885 6.51153C18.3434 7.36645 17.8684 13 17.8684 13"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
