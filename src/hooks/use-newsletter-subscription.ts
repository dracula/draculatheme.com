"use client";

import { useCallback, useState } from "react";

import { fetcher } from "@/utils/fetcher";

type SubscriptionState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

interface UseNewsletterSubscriptionReturn {
  email: string;
  handleEmailChange: (value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  isSubmitting: boolean;
  isSubscribed: boolean;
  responseMessage: string | null;
}

export const useNewsletterSubscription =
  (): UseNewsletterSubscriptionReturn => {
    const [email, setEmail] = useState("");
    const [subscriptionState, setSubscriptionState] =
      useState<SubscriptionState>({
        status: "idle"
      });

    const handleEmailChange = useCallback(
      (value: string) => {
        setEmail(value);

        if (subscriptionState.status !== "idle") {
          setSubscriptionState({ status: "idle" });
        }
      },
      [subscriptionState.status]
    );

    const handleSubmit = useCallback(
      async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubscriptionState({ status: "pending" });

        const response = await fetcher(
          `/api/add-contact?email=${encodeURIComponent(email)}`,
          "POST"
        );

        if (response.status === "error") {
          setSubscriptionState({
            status: "error",
            message: "😔 Subscription failed, please try again later."
          });
          return;
        }

        if (response.status === 200) {
          setSubscriptionState({
            status: "success",
            message: response.message ?? "You are subscribed!"
          });
          return;
        }

        setSubscriptionState({
          status: "error",
          message:
            response.message ??
            "😔 Subscription failed, please try again later."
        });
      },
      [email]
    );

    const isSubscribed = subscriptionState.status === "success";
    const isSubmitting = subscriptionState.status === "pending";
    const responseMessage =
      subscriptionState.status === "success" ||
      subscriptionState.status === "error"
        ? subscriptionState.message
        : null;

    return {
      email,
      handleEmailChange,
      handleSubmit,
      isSubmitting,
      isSubscribed,
      responseMessage
    };
  };
