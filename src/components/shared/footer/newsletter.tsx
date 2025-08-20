"use client";

import { useState } from "react";

import { fetcher } from "@/utils/fetcher";

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

    if (response.status === 200) setIsSubscribed(true);
  };

  return (
    <div id="newsletter" className="newsletter">
      <div>
        <div>
          <h3>Subscribe to our newsletter.</h3>
          <p>
            Get product updates and news <br className="hide-on-mb" />
            in your inbox. No spam.
          </p>
        </div>
      </div>
      <div>
        <div className="form">
          <input
            type="email"
            name="email"
            placeholder="vlad@transylvania.com"
            required
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubscribed}
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
