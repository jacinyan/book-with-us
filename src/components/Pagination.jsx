import React from "react";
import { Link } from "react-router-dom";

const Pagination = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && (
      <nav
        className="pagination"
      >
        <Link
          className="pagination-previous"
          to={page !== 1 ? `/page/${page - 1}` : `/page/${page}`}
          disabled={page === 1}
        >
          Previous
        </Link>
        <Link
          className="pagination-next"
          to={page !== pages ? `/page/${page + 1}` : `/page/${pages}`}
          disabled={page === pages}
        >
          Next page
        </Link>
        <ul className="pagination-list">
          {[...Array(pages).keys()].map((index) => (
            <li key={index + 1}>
              <Link
                className={
                  index + 1 === page
                    ? "pagination-link is-current"
                    : "pagination-link"
                }
                to={
                  keyword
                    ? `/search/${keyword}/page/${index + 1}`
                    : `/page/${index + 1}`
                }
              >
                {index + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;
