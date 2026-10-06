"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  target: string;
};

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const millisecondsPerSecond = 1000;
const secondsPerMinute = 60;
const minutesPerHour = 60;
const hoursPerDay = 24;

const calculateTimeLeft = (target: number, now: number): TimeLeft => {
  const totalSeconds = Math.max(
    Math.floor((target - now) / millisecondsPerSecond),
    0
  );

  return {
    days: Math.floor(
      totalSeconds / (secondsPerMinute * minutesPerHour * hoursPerDay)
    ),
    hours:
      Math.floor(totalSeconds / (secondsPerMinute * minutesPerHour)) %
      hoursPerDay,
    minutes: Math.floor(totalSeconds / secondsPerMinute) % minutesPerHour,
    seconds: totalSeconds % secondsPerMinute
  };
};

const formatUnit = (value: number) => String(value).padStart(2, "0");

export const Countdown = ({ target }: CountdownProps) => {
  const targetTime = new Date(target).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const updateNow = () => setNow(Date.now());
    const initialTimeout = setTimeout(updateNow, 0);
    const interval = setInterval(updateNow, millisecondsPerSecond);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (now !== null && now >= targetTime) {
    return <p className="arrived">The veil is open.</p>;
  }

  const timeLeft = now === null ? null : calculateTimeLeft(targetTime, now);

  const units = [
    { label: "days", value: timeLeft?.days },
    { label: "hours", value: timeLeft?.hours },
    { label: "minutes", value: timeLeft?.minutes },
    { label: "seconds", value: timeLeft?.seconds }
  ];

  return (
    <div
      className="countdown"
      aria-label="Time until Draculaween begins"
      role="timer"
    >
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
