import "./page.css";

import type { Metadata } from "next";

import { lessons } from "@/lib/pro/lessons";
import { fetcher } from "@/utils/fetcher";

export const metadata: Metadata = {
  title: "Our Journey",
  description: "Follow our journey and learn from our experiences.",
  alternates: {
    canonical: "/pro/journey"
  }
};

const JourneyPage = async () => {
  const sales = await fetcher("/api/sales?product=tPfIDt");

  return (
    <section className="container journey">
      <div className="journey-hero">
        <h1>
          <span>Our Journey to</span> <code>{sales.total}</code>
        </h1>
        <p>
          Dracula Pro reached <em>{sales.count}</em> sales to date.
          <br /> Here are our insights reaching this milestone!
        </p>
      </div>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.title} className="item">
            <h2>{lesson.title}</h2>
            <p>{lesson.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default JourneyPage;
