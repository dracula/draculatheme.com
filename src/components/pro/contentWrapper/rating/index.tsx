import "./index.scss";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import CardPlain from "../../wrappers/cardPlain";

const StarsLine = ({ filledStars }) => {
  return (
    <div className="star-line">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`icon ${index < filledStars ? "filled" : ""}`}
        >
          <StarIcon />
        </span>
      ))}
    </div>
  );
};

const Bar = ({ value }) => {
  const filledStyle = {
    backgroundImage: `linear-gradient(90deg, var(--yellow) 0%, var(--yellow) ${value}%, transparent ${value}%, transparent 100%)`
  };

  return <div className="bar" style={filledStyle} />;
};

const BarChart = ({ values }) => {
  return (
    <div className="lx-col bars">
      {values.map((value, index) => (
        <Bar key={index} value={value} />
      ))}
    </div>
  );
};

const Rating = () => {
  return (
    <article className="rating">
      <CardPlain>
        <div className="lx-col total-score">
          <span className="media">4.9</span>
          <StarsLine filledStars={5} />
          <div className="rating-total">
            <span>540 ratings</span>
          </div>
        </div>
        <BarChart values={[96, 3, 1, 0, 0]} />
        <div className="lx-col is-4 stars">
          <div className="wrapper">
            <StarsLine filledStars={5} />
            <span className="total-value">96%</span>
          </div>
          <div className="wrapper">
            <StarsLine filledStars={4} />
            <span className="total-value">3%</span>
          </div>
          <div className="wrapper">
            <StarsLine filledStars={3} />
            <span className="total-value">1%</span>
          </div>
          <div className="wrapper">
            <StarsLine filledStars={2} />
            <span className="total-value">0%</span>
          </div>
          <div className="wrapper">
            <StarsLine filledStars={1} />
            <span className="total-value">0%</span>
          </div>
        </div>
      </CardPlain>
      <Link
        href="https://form.typeform.com/to/WWQLq9"
        target="_blank"
        className="write-a-review"
      >
        <span>Write a review</span>
      </Link>
    </article>
  );
};

export default Rating;
