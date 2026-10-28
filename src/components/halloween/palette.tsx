"use client";

import type { CSSProperties } from "react";

type PaletteColor = {
  name: string;
  token: string;
  role: string;
  contrast: string;
  frequency: number;
};

const colors: PaletteColor[] = [
  {
    name: "Bone",
    token: "bone",
    role: "Foreground",
    contrast: "11.38:1",
    frequency: 146.83
  },
  {
    name: "Dust",
    token: "dust",
    role: "Comment",
    contrast: "7.05:1",
    frequency: 164.81
  },
  {
    name: "Dried blood",
    token: "dried-blood",
    role: "Red",
    contrast: "6.99:1",
    frequency: 174.61
  },
  {
    name: "Candle flame",
    token: "candle-flame",
    role: "Orange",
    contrast: "7.45:1",
    frequency: 196
  },
  {
    name: "Lantern",
    token: "lantern",
    role: "Yellow",
    contrast: "11.04:1",
    frequency: 220
  },
  {
    name: "Moss",
    token: "moss",
    role: "Green",
    contrast: "12.10:1",
    frequency: 233.08
  },
  {
    name: "Moonlight",
    token: "moonlight",
    role: "Cyan",
    contrast: "7.03:1",
    frequency: 277.18
  },
  {
    name: "Plague",
    token: "plague",
    role: "Purple",
    contrast: "7.50:1",
    frequency: 293.66
  },
  {
    name: "Dried rose",
    token: "dried-rose",
    role: "Pink",
    contrast: "7.45:1",
    frequency: 349.23
  }
];

const toneVolume = 0.07;
const toneAttack = 0.012;
const toneRelease = 0.28;
const toneStop = 0.3;

let audioContext: AudioContext | null = null;
let activeGain: GainNode | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  return audioContext;
};

const playSwatchTone = (frequency: number) => {
  const context = getAudioContext();

  if (context.state === "suspended") {
    void context.resume();
  }

  const now = context.currentTime;

  if (activeGain) {
    activeGain.gain.cancelScheduledValues(now);
    activeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    activeGain = null;
  }

  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(frequency, now);
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(toneVolume, now + toneAttack);
  gain.gain.exponentialRampToValueAtTime(0.001, now + toneRelease);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(now);
  oscillator.stop(now + toneStop);

  activeGain = gain;
};

const Swatch = ({ color }: { color: PaletteColor }) => (
  <li
    className="swatch"
    data-token={color.token}
    onMouseEnter={() => playSwatchTone(color.frequency)}
    style={{ "--swatch": `var(--${color.token})` } as CSSProperties}
  >
    <span className="name">{color.name}</span>
    <div className="meta">
      <span className="ratio">{color.contrast}</span>
      <span className="role">
        {color.role} · <em>AAA</em>
      </span>
    </div>
  </li>
);

export const Palette = () => (
  <section className="container palette" aria-labelledby="palette-title">
    <div className="intro">
      <div className="heading">
        <span className="eyebrow">The palette · Nine colors</span>
        <h2 id="palette-title">Lit by fire, not neon.</h2>
      </div>
      <p>
        Every color clears <em>AAA</em> contrast against coffin black. The spec
        keeps vigil after dark — and the hex values stay sealed inside Pro.
      </p>
    </div>
    <ol className="swatches">
      {colors.map((color) => (
        <Swatch key={color.token} color={color} />
      ))}
    </ol>
  </section>
);
