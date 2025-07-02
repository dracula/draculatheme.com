import "./page.css";

import Image from "next/image";

import Hero from "@/components/shared/hero";

const AboutPage = () => (
  <>
    <Hero />
    <section className="container about">
      <article className="prose">
        <time dateTime="2013-10-12">October 12th, 2013</time>
        <div className="content">
          <p>
            It was a cold Saturday morning. I was at a conference in Germany and
            started to feel very sick. I could barely move, but I had to take a
            plane to speak at another conference in Spain. In the middle of the
            flight, I called the flight attendant and said I needed help. The{" "}
            <em>airplane landed, and I left there in an ambulance.</em>
          </p>
          <p>
            I went to the hospital, took some blood tests, and started to feel
            better again. I thought it was just a food poisoning, and I was
            ready to leave that place.{" "}
            <em>
              They got the results and took me straight to the emergency room.
            </em>{" "}
            I was having an episode of Pancreatitis.
          </p>
          <p>
            Two days later, I was still at the hospital. My blood results were
            pretty bad, they didn&apos;t allow me to leave, so I asked a
            co-worker to bring my laptop. At least with the internet, I could{" "}
            <a
              href="https://twitter.com/zenorocha/status/390120821257039872"
              target="_blank"
              rel="noopener noreferrer"
            >
              have a distraction
            </a>
            .
          </p>
          <p>
            One day I left my room to get some water.{" "}
            <em>When I got back, my computer was stolen.</em>
          </p>
          <figure>
            <Image
              src="/images/about.jpeg"
              width={604}
              height={604}
              alt="Me and my friend Iliyan Peychev"
            />
            <figcaption>Me and my friend Iliyan Peychev</figcaption>
          </figure>
          <p>
            I was completely devastated. That computer was the only way I could
            communicate with my family in Brazil. How could someone steal from a
            person in a hospital bed? I couldn&apos;t believe that whole
            situation.
          </p>
          <p>
            The next day, my co-workers tried to cheer me up and{" "}
            <em>brought a new laptop for me</em>. I had no backup to restore
            from, so I started to install everything back again. For every code
            editor, for every terminal app, I had to choose a different theme.
          </p>
          <p>
            I always believed in the cost of context switching. I know how it
            feels when you&apos;re &quot;in the zone&quot;, then suddenly, you
            get distracted and lose focus. It shouldn&apos;t be that way, so I{" "}
            <em>decided to create my own color scheme</em>, and my mission was
            to make it available everywhere.
          </p>
        </div>
      </article>
      <article className="prose">
        <time dateTime="2013-10-27">October 27th, 2013</time>
        <div className="content">
          <p>
            <a
              href="https://github.com/dracula/dracula-theme/commit/7e4d17ade6a54b7b7d8037a0d2160a293f17ef5c"
              target="_blank"
              rel="noreferrer"
            >
              My first commit
            </a>{" "}
            was the ZSH theme. Then I moved to iTerm, Terminal.app, Sublime
            Text, and Textmate. At the end of the first day, I already had 5
            themes.{" "}
            <a
              href="https://twitter.com/zenorocha/status/395216794249486336"
              target="_blank"
              rel="noreferrer"
            >
              I tweeted about it
            </a>{" "}
            and the community started to contribute.
          </p>
          <p>
            Today Dracula is available everywhere and it&apos;s one of the{" "}
            <em>most popular themes ever.</em>
          </p>
          <p>
            I stayed in that hospital bed for 3 weeks. I can&apos;t even
            describe the feeling of being sick in a foreign country, alone and
            away from your family.
          </p>
          <p>Thanks Dracula, for distracting me when I needed the most.</p>
        </div>
      </article>
    </section>
  </>
);

export default AboutPage;
