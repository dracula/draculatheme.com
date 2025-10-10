import "./index.css";

import React, { ReactNode, useRef, useState } from "react";

type TooltipDirection = "top" | "right" | "bottom" | "left";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  delay?: number;
  direction?: TooltipDirection;
}

export const Tooltip = ({
  children,
  content,
  delay = 400,
  direction = "top"
}: TooltipProps) => {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTip = () => {
    timeoutRef.current = setTimeout(() => {
      setActive(true);
    }, delay);
  };

  const hideTip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setActive(false);
  };

  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}
      {active && <div className={`tip ${direction}`}>{content}</div>}
    </span>
  );
};
