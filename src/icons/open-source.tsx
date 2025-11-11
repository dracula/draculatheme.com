import type { IconProperties } from "@/icons/types";

export const OpenSourceIcon = ({
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
    aria-hidden="true"
  >
    <title>Open Source Icon</title>
    <path
      d="M12 8.5C9.79086 8.5 8 10.2909 8 12.5C8 13.8795 8.69837 15.096 9.76087 15.815L7.63587 21.5C4.2997 19.8793 2 16.4582 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5C22 16.4582 19.7003 19.8793 16.3641 21.5L14.2391 15.815C15.3016 15.096 16 13.8795 16 12.5C16 10.2909 14.2091 8.5 12 8.5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
