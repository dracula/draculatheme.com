"use client";

import "./index.scss";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { CheckIcon } from "lucide-react";
import Link from "next/link";
import fetchData from "src/lib/fetchData";
import { getBasePath } from "src/lib/environment";
import { textStagger } from "src/lib/framerMotion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState(null);

  const [isSubscribed, setIsSubscribed] = useState(false);

  const control = useAnimation();
  const tipRef = useRef(null);
  const inView = useInView(tipRef);

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  const handleSubscribe = async () => {
    const response = await fetchData(
      `${getBasePath()}/api/addContact?email=${email}`,
      "POST",
    );

    setResponseMessage(response.message);

    if (response.status === 200) setIsSubscribed(true);
  };

  return (
    <section id="newsletter">
      <div className="container">
        <article className="newsletter">
          <div className="title-wrapper">
            <span className="title p">Join the dark side</span>
            <span>
              Be the first to know about new products, special releases, and
              much more.
            </span>
          </div>
          <div className="input-wrapper">
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubscribed}
              placeholder="vlad@transylvania.com"
            />
            <button
              onClick={handleSubscribe}
              disabled={isSubscribed}
              className="primary"
            >
              {isSubscribed ? (
                <>
                  <span className="icon">
                    <CheckIcon />
                  </span>
                  <span>Subscribed!</span>
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
          <motion.span
            ref={tipRef}
            variants={textStagger}
            initial="hidden"
            animate={control}
            exit="exit"
            className="tip"
          >
            <em>7,449</em> people enjoy it!
          </motion.span>
          {responseMessage && (
            <span className="response">{responseMessage}</span>
          )}
          <p className="rss-link">
            Subscribe to the{" "}
            <Link href="/rss.xml" target="_blank" className="inline">
              <span>RSS Feed</span>
            </Link>
            .
          </p>
        </article>
      </div>
    </section>
  );
};

export default Newsletter;
