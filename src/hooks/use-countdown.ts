"use client";

import { useEffect, useState } from "react";

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const millisecondsPerSecond = 1000;
const secondsPerMinute = 60;
const minutesPerHour = 60;
const hoursPerDay = 24;

export const calculateTimeLeft = (target: number, now: number): TimeLeft => {
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

export const useCountdown = (target: string) => {
  const targetTime = new Date(target).getTime();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const syncNow = () => {
      const current = Date.now();
      setNow(current);

      if (current >= targetTime && intervalId !== undefined) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const initialTimeout = setTimeout(syncNow, 0);
    intervalId = setInterval(syncNow, millisecondsPerSecond);

    return () => {
      clearTimeout(initialTimeout);

      if (intervalId !== undefined) {
        clearInterval(intervalId);
      }
    };
  }, [targetTime]);

  const isReady = now !== null;
  const hasEnded = isReady && now >= targetTime;
  const timeLeft =
    isReady && !hasEnded ? calculateTimeLeft(targetTime, now) : null;

  return { isReady, hasEnded, timeLeft };
};
