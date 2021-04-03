import React from "react";

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        {[...Array(5)].map((_, index) => {
          const className =
            value >= index + 1
              ? "fas fa-star" //full star
              : value >= index + 0.5
              ? "fas fa-star-half-alt" //half star
              : "far fa-star"; //empty star
          return <i key={index} style={{ color }} className={className} />;
        })}
      </span>
      <span className="pl-2">{text && text}</span>
    </div>
  );
};

export default Rating;
