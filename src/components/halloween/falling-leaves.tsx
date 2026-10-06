"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

type LeafTone = "green" | "yellow" | "orange" | "red" | "brown";

type Leaf = {
  identifier: number;
  horizontalPosition: number;
  durationMilliseconds: number;
  sizePixels: number;
  rotationDegrees: number;
  tone: LeafTone;
};

type DriftEntry = {
  element: HTMLSpanElement;
  leaf: Leaf;
};

type FallingLeavesProps = {
  leafCount?: number;
  spawnIntervalMilliseconds?: number;
  fallDistanceViewportHeight?: number;
};

type FallingLeavesStyle = CSSProperties & {
  "--fall-distance": string;
};

const leafTones: LeafTone[] = ["green", "yellow", "orange", "red", "brown"];
const millisecondsPerSecond = 1000;

const createLeaf = (
  identifier: number,
  minimumDurationMilliseconds: number
): Leaf => {
  const toneIndex = Math.floor(Math.random() * leafTones.length);

  return {
    identifier,
    horizontalPosition: Math.random() * 100,
    durationMilliseconds:
      minimumDurationMilliseconds + Math.random() * 5 * millisecondsPerSecond,
    sizePixels: 12 + Math.random() * 12,
    rotationDegrees: Math.random() * 360,
    tone: leafTones[toneIndex]
  };
};

export const FallingLeaves = ({
  leafCount = 10,
  spawnIntervalMilliseconds = 600,
  fallDistanceViewportHeight = 120
}: FallingLeavesProps) => {
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const nextIdentifier = useRef(0);
  const driftEntries = useRef(new Map<number, DriftEntry>());
  const containerStyle: FallingLeavesStyle = {
    "--fall-distance": `${fallDistanceViewportHeight}vh`
  };

  const registerLeaf = (leaf: Leaf, element: HTMLSpanElement | null) => {
    if (element) {
      driftEntries.current.set(leaf.identifier, { element, leaf });
    } else {
      driftEntries.current.delete(leaf.identifier);
    }
  };

  const removeLeaf = (identifier: number) => {
    setLeaves((current) =>
      current.filter((leaf) => leaf.identifier !== identifier)
    );
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const initialLeaves = Array.from({ length: leafCount }, () =>
      createLeaf(nextIdentifier.current++, 5 * millisecondsPerSecond)
    );
    setLeaves(initialLeaves);

    const intervalTimer = window.setInterval(() => {
      const leaf = createLeaf(
        nextIdentifier.current++,
        6 * millisecondsPerSecond
      );
      setLeaves((current) => [...current, leaf]);
    }, spawnIntervalMilliseconds);

    return () => window.clearInterval(intervalTimer);
  }, [leafCount, spawnIntervalMilliseconds]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const smoothingFactor = 0.05;
    let mouseHorizontalPosition = window.innerWidth / 2;
    let targetMouseHorizontalPosition = mouseHorizontalPosition;
    let animationFrameIdentifier = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseHorizontalPosition = event.clientX;
    };

    const updateLeaves = () => {
      mouseHorizontalPosition +=
        (targetMouseHorizontalPosition - mouseHorizontalPosition) *
        smoothingFactor;

      driftEntries.current.forEach(({ element, leaf }) => {
        const leafHorizontalPosition =
          (leaf.horizontalPosition / 100) * window.innerWidth;
        const horizontalDriftPixels =
          (mouseHorizontalPosition - leafHorizontalPosition) * 0.02;
        element.style.transform = `translateX(${horizontalDriftPixels}px) rotate(${leaf.rotationDegrees}deg)`;
      });

      animationFrameIdentifier = requestAnimationFrame(updateLeaves);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrameIdentifier = requestAnimationFrame(updateLeaves);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameIdentifier);
    };
  }, []);

  return (
    <div className="falling-leaves" style={containerStyle} aria-hidden="true">
      {leaves.map((leaf) => (
        <span
          key={leaf.identifier}
          className="leaf"
          data-tone={leaf.tone}
          onAnimationEnd={() => removeLeaf(leaf.identifier)}
          style={{
            left: `${leaf.horizontalPosition}vw`,
            animationDuration: `${leaf.durationMilliseconds}ms`
          }}
        >
          <span
            ref={(element) => registerLeaf(leaf, element)}
            className="drift"
            style={{ transform: `rotate(${leaf.rotationDegrees}deg)` }}
          >
            <svg
              className="shape"
              width={leaf.sizePixels}
              height={leaf.sizePixels}
              viewBox="0 0 24 24"
            >
              <title>Decorative falling leaf</title>
              <path d="M12 2C6 6 4 13 12 22C20 13 18 6 12 2Z" />
              <path className="vein" d="M12 22V8" />
            </svg>
          </span>
        </span>
      ))}
    </div>
  );
};
