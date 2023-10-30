"use client";

import "./index.scss";

import CardPlain from "../../wrappers/cardPlain";
import Image from "next/image";

const testimonials = [
  {
    content: `If I’m going to be staring at a screen for <span class="highlighted">8-10 hours a day</span>, I want it to be as <span class="highlighted">painless as possible</span>. Dracula PRO allows me to be more productive by having a consistent interface with <span class="highlighted">all of my applications</span> open. Also, the theme <span class="highlighted">just looks badass</span>.`,
    author: {
      avatar: "hannah.jpeg",
      name: "Hannah Burzynski",
      title: "Data Scientist",
      location: "Austin, Texas",
    },
  },
  {
    content: `<span class="highlighted">Before Dracula PRO</span> my life was meaningless, colorless and sad. Now it is vibrant, electric and full of the <span class="highlighted">best code I've ever written</span>.`,
    author: {
      avatar: "kenny.png",
      name: "Kenny Meyers",
      title: "iOS Developer",
      location: "Seattle, Washington",
    },
  },
];

const getRandomTestimonial = () => {
  const randomIndex = Math.floor(Math.random() * testimonials.length);
  return testimonials[randomIndex];
};

const TestimonialItem = ({ testimonial }) => {
  const { content, author } = testimonial;
  const { avatar, name, title, location } = author;

  return (
    <>
      <div className="text">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
      <div className="author">
        <div className="pic">
          {avatar && (
            <Image
              src={`/images/pro/${avatar}`}
              width={100}
              height={100}
              alt={name}
            />
          )}
        </div>
        <div className="info">
          <div className="author-name">
            <span>{name}</span>
          </div>
          <div className="author-title">
            <span>{title}</span>
          </div>
          <div className="author-location">
            <span>{location}</span>
          </div>
        </div>
      </div>
    </>
  );
};

const FixedTestimonial = () => {
  const testimonial = getRandomTestimonial();

  return (
    <article className="fixed-testimonial">
      <CardPlain>
        <TestimonialItem testimonial={testimonial} />
      </CardPlain>
    </article>
  );
};

export default FixedTestimonial;
