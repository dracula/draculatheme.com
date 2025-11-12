"use client";

import { useNewsletterSubscription } from "@/hooks/use-newsletter-subscription";

import { TextRevealAnimation } from "../shared/text-reveal-animation";

const benefits = [
  "Exclusive content 1 week before public release.",
  "Midnight deals that vanish at dawn.",
  "Early access to experimental features.",
  "VIP invites to exclusive events and launches.",
  "Guaranteed protection from sunlight while coding."
];

const testimonials = [
  {
    quote: "It's alive! My code finally looks as beautiful as my creation.",
    author: "Dr. Frankenstein"
  },
  {
    quote: "Even during full moon coding marathons, my eyes stay fresh.",
    author: "Lawrence Talbot, Werewolf Dev"
  },
  {
    quote:
      "I've been dead for centuries. This theme brought me back to coding.",
    author: "The Mummy"
  },
  {
    quote: "Finally found a theme darker than my swamp. No more eye strain.",
    author: "Creature from the Black Lagoon"
  }
];

export const NewsletterWrapper = () => {
  const {
    email,
    handleEmailChange,
    handleSubmit,
    isSubscribed,
    isSubmitting,
    responseMessage
  } = useNewsletterSubscription();

  return (
    <section className="container newsletter">
      <div className="wrapper">
        <h1>Join the Clan!</h1>
        <h2>
          “Welcome to my house! Enter freely. Go safely, and leave something of
          the happiness you bring.” - Bram Stoker, Dracula
        </h2>
        <ul className="benefits">
          {benefits.map((benefit) => (
            <li key={benefit} className="benefit">
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <div className="form-wrapper">
          <TextRevealAnimation>
            <em>11,460</em> people enjoy it!
          </TextRevealAnimation>
          <form className="form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input
                type="email"
                autoComplete="email"
                name="email"
                value={email}
                disabled={isSubscribed || isSubmitting}
                onChange={(event) => handleEmailChange(event.target.value)}
                placeholder="vlad@transylvania.com"
                required
              />
              <button
                type="submit"
                disabled={isSubscribed || isSubmitting}
                className="action primary"
              >
                {isSubmitting
                  ? "Subscribing..."
                  : `Subscribe${isSubscribed ? "d!" : ""}`}
              </button>
            </div>
          </form>
          {responseMessage && (
            <span className="response">{responseMessage}</span>
          )}
          <span className="disclaimer">
            By submitting your email address, you agree to receive
            <br />
            Dracula&apos;s newsletter. You can always unsubscribe.
          </span>
        </div>
        <hr />
        <div className="testimonials-wrapper">
          <h3>
            <em>Check out these </em>
            <br />
            Testimonials<span className="disclaimer"> *</span>
            <br />
            <span className="disclaimer">...totally not made-up!</span>
          </h3>
          <ul className="testimonials">
            {testimonials.map((testimonial) => (
              <li key={testimonial.author} className="testimonial">
                <p className="quote">&quot;{testimonial.quote}&quot;</p>
                <p className="author">— {testimonial.author}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
