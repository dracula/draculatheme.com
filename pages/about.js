import React from 'react';
import Head from 'next/head';
import Theme from '../layouts/Theme';
import ProCta from '../components/ProCta';

export async function getStaticProps() {
  const query = { title: 'About', color: 'cyan', icon: 'pack-1/045-dracula.svg' };
  return { props: { query } };
}

class About extends React.Component {
  render() {
    const title = 'About — The origin story of the Dracula project';
    const description = 'October 12th, 2013 - It was a cold Saturday morning. I was at a conference in Germany and started to feel very sick. I could barely move, but I had to take a plane to speak at another conference in Spain. In the middle of the flight, I called the flight attendant and said I needed help.';
    const image = '/static/img/about.jpeg';

    return (
      <div className="single">
        <Head>
          <meta charSet="utf-8" />
          <title>{title}</title>
          <meta content={title} property="og:title" />
          <meta content={description} name="description" />
          <meta content={description} property="og:description" />
          <meta content="Zeno Rocha" name="author" />
          <meta content="https://draculatheme.com/about" property="og:url" />
          <meta content={`https://draculatheme.com${image}`} property="og:image" />
        </Head>

        <div className="wrap">
          <div className="theme">
            <h3>Origin Story</h3>
            <p><strong>October 12th, 2013</strong> - It was a cold Saturday morning. I was at a conference in Germany and started to feel very sick. I could barely move, but I had to take a plane to speak at another conference in Spain. In the middle of the flight, I called the flight attendant and said I needed help. <span className="highlight">The airplane landed, and I left there in an ambulance</span>.</p>
            <p>I went to the hospital, took some blood tests, and started to feel better again. I thought it was just a food poisoning, and I was ready to leave that place. They got the results and <span className="highlight">took me straight to the emergency room.</span> I was having an episode of Pancreatitis.</p>
            <p>Two days later, I was still at the hospital. My blood results were pretty bad, they didn't allow me to leave, so I asked a co-worker to bring my laptop. At least with the internet, I could <a href="https://twitter.com/zenorocha/status/390120821257039872">have a distraction</a>.</p>
            <p>One day I left my room to get some water. <span className="highlight">When I got back, my computer was stolen</span>.</p>

            <img src={image} alt="Me and my friend Iliyan Peychev" />
            <em>Me and my friend Iliyan Peychev</em>

            <p>I was completely devastated. That computer was the only way I could communicate with my family in Brazil. How could someone steal a person in a hospital bed? I couldn't believe that whole situation.</p>
            <p>The next day, my co-workers tried to cheer me up and <span className="highlight">brought a new laptop for me</span>. I had no backup to restore from, so I started to install everything back again. For every code editor, for every terminal app, I had to choose a different theme.</p>
            <p>I always believed in the cost of context switching. I know how it feels when you're <em>"in the zone"</em>, then suddenly, you get distracted and lose focus. It shouldn't be that way, so <span className="highlight">I decided to create my own color scheme</span>, and my mission was to make it <span className="highlight">available everywhere</span>.</p>
            <p><strong>October 27th, 2013</strong> - <a href="https://github.com/dracula/dracula-theme/commit/7e4d17ade6a54b7b7d8037a0d2160a293f17ef5c">My first commit</a> was the ZSH theme. Then I moved to iTerm, Terminal.app, Sublime Text, and Textmate. At the end of the first day, I already had 5 themes. I <a href="https://twitter.com/zenorocha/status/395216794249486336">tweeted about it</a> and the community started to contribute.</p>
            <p>Today Dracula is available everywhere and it's one of the <span className="highlight">most popular themes ever created.</span></p>
            <p>I stayed in that hospital bed for 3 weeks. I can't even describe the feeling of being sick in a foreign country, alone and away from your family.</p>
            <p>Thanks Dracula, for distracting me when I needed the most.</p>
          </div>
        </div>

        <ProCta />
      </div>
    )
  }
}

About.Layout = Theme;

export default About;
