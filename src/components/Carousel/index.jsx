import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import Loader from "../Loader";
import Error from "../Error";

import { listTopItems } from "../../redux/actions/itemActions";

import "./index.scss";

const Carousel = () => {
  const dispatch = useDispatch();

  const itemsTopRated = useSelector((state) => state.itemsTopRated);
  const { error, items } = itemsTopRated;

  const [activeIndex, setActiveIndex] = useState(0);

  const maxIndex = localStorage.getItem("numTopItems")
    ? Number(localStorage.getItem("numTopItems")) - 1
    : null;

  useEffect(() => {
    dispatch(listTopItems());
    
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex(activeIndex === maxIndex ? 0 : activeIndex + 1);
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  },[activeIndex, maxIndex])

  return error ? (
    <Error />
  ) : (
    <div className="carousel">
      <section className="slides">
        <div className="columns is-vcentered">
          <div className="column is-6 ">
            <div style={{ fontSize: "4rem" }}>Best Sellers</div>
          </div>
          <div className="column is-6">
            {items.map((item, index) => (
              <div
                key={index}
                className={index === activeIndex ? "slide active" : "slide"}
              >
                {index === activeIndex && (
                  <div className="columns ">
                    <div className="column ">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ height: 250 }}
                      />
                    </div>
                    <div className="column">
                      <p style={{color:"#363636"}}>-- By {item.author}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="dots">
        {items.map((_, index) => (
          <span
            key={index}
            className={activeIndex === index ? "dot active" : "dot"}
            onClick={() => setActiveIndex(index)}
          ></span>
        ))}
      </div>
      <div className="arrows">
        <span
          className="prev"
          onClick={() =>
            setActiveIndex(activeIndex < 1 ? maxIndex : activeIndex - 1)
          }
        >
          &#10094;
        </span>
        <span
          className="next"
          onClick={() =>
            setActiveIndex(activeIndex === maxIndex ? 0 : activeIndex + 1)
          }
        >
          &#10095;
        </span>
      </div>
    </div>
  );
};

export default Carousel;
