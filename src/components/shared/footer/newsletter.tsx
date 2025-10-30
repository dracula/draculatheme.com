"use client";

import Link from "next/link";
import { useState } from "react";

import { fetcher } from "@/utils/fetcher";

import { TextRevealAnimation } from "../text-reveal-animation";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async () => {
    const response = await fetcher(`/api/add-contact?email=${email}`, "POST");

    if (response.status === "error") {
      setResponseMessage("😔 Subscription failed, please try again later.");
      return;
    }

    setResponseMessage(response.message);

    if (response.status === 200) {
      setIsSubscribed(true);
    }
  };

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
        <div className="form">
          <input
            type="email"
            autoComplete="email"
            name="email"
            disabled={isSubscribed}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="vlad@transylvania.com"
            required
          />
          <button
            type="submit"
            onClick={handleSubscribe}
            disabled={isSubscribed}
            className="action primary"
          >
            Subscribe{isSubscribed && "d!"}
          </button>
        </div>
        {responseMessage && <span className="response">{responseMessage}</span>}
        <span className="disclaimer">
          By submitting your email address, you agree to receive Dracula&apos;s
          newsletter. You can always unsubscribe.
        </span>
      </div>
    </div>
  );
};
