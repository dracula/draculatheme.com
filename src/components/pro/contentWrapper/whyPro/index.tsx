import "./index.scss";

import CardPlain from "../../wrappers/cardPlain";
import Image from "next/image";
import Link from "next/link";

const WhyPro = () => {
  return (
    <article className="why-pro">
      <CardPlain>
        <div className="lx-col content">
          <span className="title s">Why Dracula PRO</span>
          <div className="text">
            <p>
              In 2013,{" "}
              <Link href="/about" className="inline highlighted">
                Zeno Rocha's laptop was stolen
              </Link>
              , forcing him to reconfigure everything. Thousands of themes were
              out there then, but none appealed to him. So, he decided to{" "}
              <span className="highlighted">create his own</span>.
            </p>
            <p>
              Fast forward to 2020, Dracula is one of the most popular themes in
              the world. Still, something needed to be added. Zeno would like to
              help with{" "}
              <span className="highlighted">more than just a theme</span>, so he
              created Dracula PRO.
            </p>
            <p>
              This package is designed for developers who want to{" "}
              <span className="highlighted">invest in their productivity</span>.
            </p>
          </div>
        </div>
        <div className="lx-col photo">
          <Image
            src="/images/pro/why-dracula.jpg"
            alt="Zeno Rocha"
            width={400}
            height={400}
          />
        </div>
      </CardPlain>
    </article>
  );
};

export default WhyPro;
