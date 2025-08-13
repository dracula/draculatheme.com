"use client";

import type React from "react";
import { useState } from "react";

import { fetcher } from "@/utils/fetcher";

type Status = {
  type: "success" | "error";
  message: string;
} | null;

export const Form = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const data = await fetcher("/api/request-access", "POST", {
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      if (data.status === "error") {
        setStatus({
          type: "error",
          message: data.message || "Error processing request."
        });
        return;
      }

      setStatus({
        type: "success",
        message:
          data.message ||
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
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="email">Email used for purchase:</label>
      <div className="input-wrapper">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="vlad@transylvania.com"
          autoComplete="email"
          required
        />
        <button type="submit" disabled={loading} className="action primary">
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
};
