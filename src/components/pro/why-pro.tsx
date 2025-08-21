import Image from "next/image";
import Link from "next/link";

export const WhyPro = () => (
  <div className="why-pro">
    <div className="content">
      <h3>Why Dracula Pro?</h3>
      <p>
        In 2013, <Link href="/about">Zeno Rocha&apos;s laptop was stolen,</Link>{" "}
        forcing him to reconfigure everything from scratch. There were already
        many themes available at the time, but none appealed to him. So, he
        decided to <em>create his own.</em>
      </p>
      <p>
        Fast forward to 2020, Dracula became one of the most popular themes in
        the world. Still, for Zeno, something was missing. Something{" "}
        <em>beyond just a theme,</em> so he created Dracula Pro.
      </p>
      <p>
        This package was designed for developers who want to{" "}
        <em>invest in their productivity.</em>
      </p>
    </div>
    <div className="photo">
      <Image
        src="/images/pro/why-dracula.jpg"
        alt="Zeno Rocha"
        width={462}
        height={408}
      />
    </div>
  </div>
);
