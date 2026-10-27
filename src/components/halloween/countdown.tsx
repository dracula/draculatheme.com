"use client";

import type { ReactNode } from "react";

import { type TimeLeft, useCountdown } from "@/hooks/use-countdown";

type CountdownProps = {
  target: string;
  label?: string;
  ended?: ReactNode;
};

const defaultEnded = <p className="arrived">The veil is open.</p>;

const formatUnit = (value: number) => String(value).padStart(2, "0");

const unitsFromTimeLeft = (timeLeft: TimeLeft | null) => [
  { label: "Days", value: timeLeft?.days },
  { label: "Hours", value: timeLeft?.hours },
  { label: "Minutes", value: timeLeft?.minutes },
  { label: "Seconds", value: timeLeft?.seconds }
];

export const Countdown = ({
  target,
  label = "Time until Draculaween begins",
  ended = defaultEnded
}: CountdownProps) => {
  const { hasEnded, timeLeft } = useCountdown(target);

  if (hasEnded) {
    return ended;
  }

  const units = unitsFromTimeLeft(timeLeft);

  return (
    <div className="countdown" aria-label={label} role="timer">
      {units.map((unit) => (
        <div key={unit.label} className="unit">
          <span className="value">
            {unit.value === undefined ? "––" : formatUnit(unit.value)}
          </span>
          <span className="label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
};
