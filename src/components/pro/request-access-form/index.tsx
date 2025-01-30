"use client";

import React, { useState } from "react";

type Status = {
  type: "success" | "error";
  message: string;
} | null;

export default function RequestAccess() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/request-access", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error processing request.");
      }

      setStatus({
        type: "success",
        message:
          "Access granted! Check your email to accept the GitHub invitation."
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "An error occurred"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="request-access-form">
      <label htmlFor="email">Email used for purchase:</label>
      <div className="input-wrapper">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vlad@transylvania.com"
          required
        />
        <button type="submit" disabled={loading} className="primary">
          {loading ? "Processing" : "Request Access"}
        </button>
      </div>
      {status && (
        <div className="status-message" role="alert">
          <span>{status.message}</span>
        </div>
      )}
    </form>
  );
}
