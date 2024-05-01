import "./index.scss";
import {
  Code2Icon,
  CrosshairIcon,
  EyeIcon,
  PaletteIcon,
  ToggleRightIcon
} from "lucide-react";
import Image from "next/image";
import CardSpotlight from "../../wrappers/cardSpotlight";

type FeatureCardProps = {
  className: string;
  icon: React.ReactElement;
  title: string;
  text: React.ReactElement;
  children?: React.ReactNode;
};

const FeatureCard = ({
  className,
  icon,
  title,
  text,
  children
}: FeatureCardProps) => (
  <CardSpotlight className={`lx-col ${className}`}>
    <div className="lx-col description">
      <span className="icon">{icon}</span>
      <span className="title t">{title}</span>
      <div className="text">{text}</div>
    </div>
    {children && children}
  </CardSpotlight>
);

const Features = () => {
  const cardsData = [
    {
      className: "is-12 geometric-color-palette",
      icon: <PaletteIcon />,
      title: "Geometric Color Palette",
      text: (
        <>
          <p>
            Isaac Newton was one of{" "}
            <span className="highlighted">the first</span> to organize colors
            geometrically.
          </p>
          <p>
            In 1704, He observed the relationships between different wavelengths
            of light and arranged them as a{" "}
            <span className="highlighted">Hue circle</span>, identifying
            different patterns that emerged from this representation. This would
            become the basis of modern color theory.
          </p>
          <p>
            Dracula&apos;s original colors, created in 2013, were based on
            personal taste. This new PRO version brings a more refined and{" "}
            <span className="highlighted">mathematical approach</span> that
            normalizes luminosity and saturation.
          </p>
        </>
      ),
      children: (
        <div className="lx-col wheels-wrapper">
          <div className="wheel normal">
            <div className="indicator">
              <Image
                src="/images/pro/classic-schema-indicators.svg"
                alt="Classic Schema Indicators"
                width={112}
                height={112}
              />
            </div>
          </div>
          <div className="wheel pro">
            <div className="indicator">
              <Image
                src="/images/pro/pro-schema-indicators.svg"
                alt="Classic Schema Indicators"
                width={112}
                height={112}
              />
            </div>
          </div>
        </div>
      )
    },
    {
      className: "easy-on-the-eyes",
      icon: <EyeIcon />,
      title: "Easy on the Eyes",
      text: (
        <p>
          Dark mode is everywhere, and there&apos;s a reason for that. There are
          many reasons to love it, from improved battery consumption to{" "}
          <span className="highlighted">better visibility</span> in low-light
          environments.
        </p>
      )
    },
    {
      className: "less-context-switch",
      icon: <ToggleRightIcon />,
      title: "Less Context Switch",
      text: (
        <p>
          Having the same color scheme across multiple apps{" "}
          <span className="highlighted">reduces the time</span> it takes to
          switch contexts between tasks. That&apos;s why Dracula PRO is
          available on as many platforms as possible.
        </p>
      )
    },
    {
      className: "precise-contrast",
      icon: <CrosshairIcon />,
      title: "Precise Contrast",
      text: (
        <p>
          Battle-tested with WCAG 2.0 Level AA Specifications, with a Contrast
          Ratio of at least <b>4.5:1</b> for standard text, thus providing the{" "}
          <span className="highlighted">best readability</span>.
        </p>
      )
    },
    {
      className: "is-12 hand-picked-typography",
      icon: <Code2Icon />,
      title: "Hand-picked Typography",
      text: (
        <>
          <p>
            We have carefully{" "}
            <span className="highlighted">
              selected four monospaced programming fonts
            </span>{" "}
            that fit perfectly into Dracula PRO.
          </p>
          <p>
            These fonts have{" "}
            <span className="highlighted">built-in ligature support</span> that
            improves readability. By displaying a shorter glyph instead of 2 or
            sometimes 3, the{" "}
            <span className="highlighted">human brain spends less energy</span>{" "}
            scanning, analysing and joining multiple characters into one.
          </p>
          <p>
            <span className="highlighted">Don&apos;t like ligatures?</span> No
            problem; you can still use these fonts.
          </p>
        </>
      ),
      children: (
        <div className="lx-col animation">
          <video autoPlay loop>
            <source src="/videos/ligatures.mp4" type="video/mp4" />
          </video>
        </div>
      )
    }
  ];

  return (
    <article className="features">
      <div className="title-wrapper">
        <span className="title s">Unlike anything you&apos;ve used before</span>
        <span>
          Carefully designed down to the last pixel and engineered for
          relentless precision.
        </span>
      </div>
      <div className="cards-wrapper">
        {cardsData.map((card, index) => (
          <FeatureCard key={index} {...card} />
        ))}
      </div>
    </article>
  );
};

export default Features;
