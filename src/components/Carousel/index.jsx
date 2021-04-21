import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TypeWriter from "typewriter-effect";

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
    }, 7000);
    return () => {
      clearInterval(timer);
    };
  }, [activeIndex, maxIndex]);

  return error ? (
    <Error />
  ) : (
    <div className="carousel">
      <section className="slides">
        <div className="columns is-vcentered is-mobile" style={{width: "60%"}}>
          <div className="column is-6 ">
            <div style={{ fontSize: "3.5rem" }}>
              <TypeWriter
                options={{
                  autoStart: true,
                  loop: true,
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('Books R US')
                    .pauseFor(2700)
                    .deleteAll()
                    .typeString('Best Sellers')
                    .pauseFor(2700)
                    .deleteAll()
                    .typeString('Pick your Favs')
                    .pauseFor(2700)
                    .deleteAll()
                    .start();
                }}
              />
            </div>
          </div>
          <div className="column is-6">
            {items.map((item, index) => (
              <div
                key={index}
                className={index === activeIndex ? "slide active" : "slide"}
              >
                {index === activeIndex && (
                  <div className="columns">
                    <div className="column is-mobile-8 is-mobile-offset-2 is-6-tablet is-6-desktop is-6-widescreen">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ maxHeight: "14rem" }}
                      />
                    </div>
                    <div className="column has-text-centered is-6-tablet is-6-desktop is-6-widescreen">
                      <p style={{ color: "#363636" }}>-- {item.author}</p>
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
