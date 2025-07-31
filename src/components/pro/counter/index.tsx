"use client";

import "./index.css";

import {
  motion,
  type MotionValue,
  useSpring,
  useTransform
} from "motion/react";
import { useEffect } from "react";

const height = 50;

const AnimatedNumber = ({
  mv,
  number
}: {
  mv: MotionValue;
  number: number;
}) => {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;

    let memo = offset * height;

    if (offset > 5) {
      memo -= 10 * height;
    }

    return memo;
  });

  return (
    <motion.span style={{ y }} className="number">
      {number}
    </motion.span>
  );
};

const Digit = ({ place, value }: { place: number; value: number }) => {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(0);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className="digit">
      {[...Array(10).keys()].map((i) => (
        <AnimatedNumber key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
};

const Separator = ({ children }: { children: string }) => (
  <span className="separator">{children}</span>
);

export const Counter = ({ value }: { value: number }) => {
  const integerPart = Math.floor(value);
  const decimalPart = Math.round((value - integerPart) * 100);

  const integerStr = integerPart.toString();
  const decimalStr = decimalPart.toString().padStart(2, "0");

  const formatWithCommas = (str: string) => {
    const reversed = str.split("").reverse();
    const groups = [];

    for (let i = 0; i < reversed.length; i += 3) {
      groups.push(
        reversed
          .slice(i, i + 3)
          .reverse()
          .join("")
      );
    }

    return groups.reverse();
  };

  const integerGroups = formatWithCommas(integerStr);

  return (
    <div className="counter" aria-hidden="true">
      <div className="digit">
        <span className="number">$</span>
      </div>
      {integerGroups.map((group, groupIndex) => {
        const totalGroupsBefore = integerGroups.length - 1 - groupIndex;
        const groupKey = `group-${totalGroupsBefore}`;

        return (
          <div key={groupKey} className="group">
            {group.split("").map((_, digitIndex) => {
              const globalIndex =
                integerGroups.slice(0, groupIndex).join("").length + digitIndex;
              const place = 10 ** (integerStr.length - 1 - globalIndex);
              return <Digit key={place} place={place} value={integerPart} />;
            })}
            {groupIndex < integerGroups.length - 1 && <Separator>,</Separator>}
          </div>
        );
      })}
      <Separator>.</Separator>
      {decimalStr.split("").map((_, index) => {
        const place = index === 0 ? 10 : 1;
        return (
          <Digit key={`decimal-${place}`} place={place} value={decimalPart} />
        );
      })}
    </div>
  );
};
