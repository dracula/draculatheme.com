import "./index.scss";

import Pagination from "./pagination";
import Slides from "./slides";
import { useState } from "react";

const Testimonials = ({ reviews }) => {
  if (!reviews) {
    return null;
  }

  if (!Array.isArray(reviews)) {
    reviews = Object.values(reviews);
  }

  if (reviews.length === 0) {
    return null;
  }

  const [[currentPage, direction], setCurrentPage] = useState([0, 0]);

  const pages = Array.from(
    { length: Math.ceil(reviews.length / 2) },
    (_, i) => i,
  );

  const setPage = (newPage, newDirection) => {
    if (newPage < 0) {
      newPage = 0;
    } else if (newPage >= pages.length) {
      newPage = pages.length - 1;
    }

    if (!newDirection) {
      newDirection = newPage - currentPage;
    }

    setCurrentPage([newPage, newDirection]);
  };

  return (
    <article className="testimonials">
      <Pagination pages={pages} currentPage={currentPage} setPage={setPage} />
      <Slides
        reviews={reviews}
        pages={pages}
        currentPage={currentPage}
        direction={direction}
        setPage={setPage}
      />
    </article>
  );
};

export default Testimonials;
