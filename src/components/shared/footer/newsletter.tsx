"use client";

import Link from "next/link";

import { useNewsletterSubscription } from "@/hooks/use-newsletter-subscription";

import { TextRevealAnimation } from "../text-reveal-animation";

export const Newsletter = () => {
  const {
    email,
    handleEmailChange,
    handleSubmit,
    isSubscribed,
    isSubmitting,
    responseMessage
  } = useNewsletterSubscription();

  return (
    <div id="newsletter" className="newsletter">
      <div>
        <div>
          <h3>Subscribe to our newsletter.</h3>
          <p>
            Get product updates and Dracula Pro news{" "}
            <br className="hide-on-mb" />
            in your inbox. <b>No spam, ever.</b>
          </p>
          <Link href="/newsletter">Learn more →</Link>
        </div>
      </div>
      <div>
        <TextRevealAnimation>
          <em>11,460</em> people enjoy it!
        </TextRevealAnimation>
        <form className="form" onSubmit={handleSubmit}>
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
        </form>
        {responseMessage && <span className="response">{responseMessage}</span>}
        <span className="disclaimer">
          By submitting your email address, you agree to receive Dracula&apos;s
          newsletter. You can always unsubscribe.
        </span>
      </div>
    </div>
  );
};
