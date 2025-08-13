import { EasyOnTheEyes } from "./easy-on-the-eyes";
import { HandPickedTypography } from "./hand-picked-typography";
import { LessContextSwitch } from "./less-context-switch";
import { Palette } from "./palette";
import { PreciseContrast } from "./precise-contrast";

export const Bento = () => (
  <div className="bento">
    <div className="header">
      <h3>Unlike anything you&apos;ve used before</h3>
      <p>
        Carefully designed down to the last pixel and engineered for relentless
        precision.
      </p>
    </div>
    <Palette />
    <EasyOnTheEyes />
    <LessContextSwitch />
    <PreciseContrast />
    <HandPickedTypography />
  </div>
);
