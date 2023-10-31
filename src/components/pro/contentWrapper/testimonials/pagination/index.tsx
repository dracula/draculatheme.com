import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

const Pagination = ({ pages, currentPage, setPage }) => {
  return (
    <div className="arrows">
      <button
        disabled={currentPage === 0}
        onClick={() => setPage(currentPage - 1)}
        title="Previous"
        className="left"
      >
        <span className="icon">
          <ArrowLeftIcon />
        </span>
        <span>Prev</span>
      </button>
      <button
        disabled={currentPage === pages.length - 1}
        onClick={() => setPage(currentPage + 1)}
        title="Next"
        className="right"
      >
        <span>Next</span>
        <span className="icon">
          <ArrowRightIcon />
        </span>
      </button>
    </div>
  );
};

export default Pagination;
