import "./page.css";

import { Counter } from "@/components/pro/counter";
import { lessons } from "@/lib/pro/lessons";
import { fetcher } from "@/utils/fetcher";

const JourneyPage = async () => {
  const sales = await fetcher("/api/sales?product=tPfIDt");
  const salesValue = Number.parseFloat(sales.total.replace(/[$,]/g, ""));

  return (
    <section className="container journey">
      <div className="hero">
        <h1>
          Our Journey to <Counter value={salesValue} />
          <span className="sr-only">{sales.total}</span>
        </h1>
        <p>
          Dracula Pro reached <em>{sales.count}</em> sales to date. Here are our
          insights reaching this milestone!
        </p>
      </div>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.title} className="item">
            <h3>{lesson.title}</h3>
            <p>{lesson.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default JourneyPage;
