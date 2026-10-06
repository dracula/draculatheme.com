"use client";

import { type ChangeEvent, type SubmitEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

type ApiResponse = {
  message?: string;
  error?: string;
};

const fallbackError = "The shadows interfered. Please try again.";

export const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const endpoint = `/api/add-contact?email=${encodeURIComponent(email)}`;
      const response = await fetch(endpoint, { method: "POST" });
      const data: ApiResponse = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? fallbackError);
        return;
      }

      setStatus("success");
      setMessage("You’re on the list. We’ll call when the night begins.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage(fallbackError);
    }
  };

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <label htmlFor="newsletter-email">
        Leave your email at the gates. We’ll summon you when the veil lifts.
      </label>
      <div className="field">
        <input
          id="newsletter-email"
          onChange={handleChange}
          type="email"
          name="email"
          value={email}
          placeholder="vlad@transylvania.com"
          autoComplete="email"
          required
          disabled={status === "loading"}
          aria-describedby="newsletter-message"
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Entering…" : "Enter the crypt"}
        </button>
      </div>
      <p
        className="message"
        id="newsletter-message"
        data-status={status}
        role="status"
      >
        {message}
      </p>
    </form>
  );
};
