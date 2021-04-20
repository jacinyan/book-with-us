import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Loader from "../components/Loader";
import Error from "../components/Error";

import { listTopItems } from "../redux/actions/itemActions";

const Carousel = () => {
  const dispatch = useDispatch();

  const itemsTopRated = useSelector((state) => state.itemsTopRated);
  const { loading, error, items } = itemsTopRated;

  const [activeIndex, setActiveIndex] = useState(0);

  const index = localStorage.getItem("numTopItems")
    ? Number(localStorage.getItem("numTopItems"))
    : 0;

  useEffect(() => {
    dispatch(listTopItems());
    const timer = setInterval(() => {
      setActiveIndex(activeIndex === index ? 0 : activeIndex + 1);
    }, 10000);
    return () => {
      clearInterval(timer);
    };
  }, [dispatch, activeIndex, index]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Error />
  ) : (
    <>
      <section>
        {items.map((item, index) => (
          <div
            key={index}
            className={
              index === activeIndex ? "slide active" : "slide inactive"
            }
          >
            <img className="slide-image" src={item.image} alt={item.name} />
            <div className="slide-title">Top sellers</div>
            <p className="slide-text">{item.author}</p>
          </div>
        ))}
      </section>
      <div className="arrows">
        <span
          className="prev"
          onClick={() =>
            setActiveIndex(activeIndex < 1 ? index : activeIndex - 1)
          }
        >
          &#10094;
        </span>
        <span
          className="next"
          onClick={() =>
            setActiveIndex(activeIndex === index ? 0 : activeIndex + 1)
          }
        >
          &#10095;
        </span>
      </div>
      <div className="dots-group">
        {items.map((_, index) => (
          <span
            key={index}
            className={activeIndex === index ? "dot active" : "dot"}
            onClick={(activeIndex) => setActiveIndex(activeIndex)}
          ></span>
        ))}
      </div>
    </>
  );
};

export default Carousel;
