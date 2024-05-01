"use client";

import "./index.scss";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useAnimation,
  useInView
} from "framer-motion";
import { ListIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { appFadeInUp } from "src/lib/framerMotion";

const AboutArticles = () => {
  const control = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  return (
    <AnimatePresence>
      <LayoutGroup>
        <motion.div className="about-articles">
          <motion.article
            ref={ref}
            variants={appFadeInUp}
            initial="hidden"
            animate={control}
            exit="exit"
          >
            <div className="head">
              <span className="icon">
                <ListIcon />
              </span>
              <span>October 12th, 2013</span>
            </div>
            <div className="content">
              <p>
                It was a cold Saturday morning. I was at a conference in Germany
                and started to feel very sick. I could barely move, but I had to
                take a plane to speak at another conference in Spain. In the
                middle of the flight, I called the flight attendant and said I
                needed help. The{" "}
                <span>airplane landed, and I left there in an ambulance.</span>
              </p>
              <p>
                I went to the hospital, took some blood tests, and started to
                feel better again. I thought it was just a food poisoning, and I
                was ready to leave that place.{" "}
                <span>
                  They got the results and took me straight to the emergency
                  room.
                </span>{" "}
                I was having an episode of Pancreatitis.
              </p>
              <p>
                Two days later, I was still at the hospital. My blood results
                were pretty bad, they didn&apos;t allow me to leave, so I asked
                a co-worker to bring my laptop. At least with the internet, I
                could{" "}
                <Link
                  href="https://twitter.com/zenorocha/status/390120821257039872"
                  className="inline"
                >
                  have a distraction
                </Link>
                .
              </p>
              <p>
                One day I left my room to get some water.{" "}
                <span>When I got back, my computer was stolen.</span>
              </p>
            </div>
            <figure>
              <div className="image-container">
                <Image
                  src="/images/about.jpeg"
                  width={604}
                  height={604}
                  alt="Me and my friend Iliyan Peychev"
                  priority={false}
                />
              </div>
              <figcaption>Me and my friend Iliyan Peychev</figcaption>
            </figure>
            <div className="content">
              <p>
                I was completely devastated. That computer was the only way I
                could communicate with my family in Brazil. How could someone
                steal from a person in a hospital bed? I couldn&apos;t believe
                that whole situation.
              </p>
              <p>
                The next day, my co-workers tried to cheer me up and{" "}
                <span>brought a new laptop for me</span>. I had no backup to
                restore from, so I started to install everything back again. For
                every code editor, for every terminal app, I had to choose a
                different theme.
              </p>
              <p>
                I always believed in the cost of context switching. I know how
                it feels when you&apos;re &quot;in the zone&quot;, then
                suddenly, you get distracted and lose focus. It shouldn&apos;t
                be that way, so I{" "}
                <span>decided to create my own color scheme</span>, and my
                mission was to make it available everywhere.
              </p>
            </div>
            <div className="head">
              <span className="icon">
                <ListIcon />
              </span>
              <span>October 27th, 2013</span>
            </div>
            <div className="content">
              <p>
                <Link
                  href="https://github.com/dracula/dracula-theme/commit/7e4d17ade6a54b7b7d8037a0d2160a293f17ef5c"
                  className="inline"
                >
                  My first commit
                </Link>{" "}
                was the ZSH theme. Then I moved to iTerm, Terminal.app, Sublime
                Text, and Textmate. At the end of the first day, I already had 5
                themes.{" "}
                <Link
                  href="https://twitter.com/zenorocha/status/395216794249486336"
                  className="inline"
                >
                  I tweeted about it
                </Link>{" "}
                and the community started to contribute.
              </p>
              <p>
                Today Dracula is available everywhere and it&apos;s one of the{" "}
                <span>most popular themes ever.</span>
              </p>
              <p>
                I stayed in that hospital bed for 3 weeks. I can&apos;t even
                describe the feeling of being sick in a foreign country, alone
                and away from your family.
              </p>
              <p>Thanks Dracula, for distracting me when I needed the most.</p>
            </div>
          </motion.article>
        </motion.div>
      </LayoutGroup>
    </AnimatePresence>
  );
};

export default AboutArticles;
