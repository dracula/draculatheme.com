import Image from "next/image";

export const LightVariant = () => (
  <div className="light-variant">
    <div className="content">
      <h3>For those who thrive on light</h3>
      <p>
        For years, we resisted the idea of a light theme for Dracula. However,
        we recognize its importance for accessibility and use in bright
        environments.
      </p>
      <p>
        That&apos;s why we created Alucard, a light variant that seamlessly
        integrates with Dracula Pro. It meets <code>WCAG AA</code> contrast
        standards, ensuring legibility and inclusivity.
      </p>
    </div>
    <div className="preview">
      <Image
        src="/images/pro/vscode/7.png"
        alt="VsCode with Alucard"
        width={1680}
        height={1008}
        quality={100}
      />
    </div>
  </div>
);
