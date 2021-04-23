import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TypeWriter from "typewriter-effect";

import { listTopItems } from "../../redux/actions/itemActions";

import "./index.scss";

const Carousel = () => {
  const dispatch = useDispatch();

  const itemsTopRated = useSelector((state) => state.itemsTopRated);
  const { error, items } = itemsTopRated;

  const [current, setCurrent] = useState(0);

  const maxIndex = localStorage.getItem("numTopItems")
    ? Number(localStorage.getItem("numTopItems")) - 1
    : null;

  useEffect(() => {
    dispatch(listTopItems());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(current === maxIndex ? 0 : current + 1);
    }, 7000);
    return () => {
      clearInterval(timer);
    };
  }, [current, maxIndex]);

  return (
    !error && (
      <div className="carousel">
        <section className="slides">
          <div
            className="columns is-vcentered is-mobile"
            style={{ width: "60%" }}
          >
            <div className="column is-6 ">
              <div style={{ fontSize: "3.5rem" }}>
                <TypeWriter
                  options={{
                    autoStart: true,
                    loop: true,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .typeString("Books R US")
                      .pauseFor(2700)
                      .deleteAll()
                      .typeString("Best Sellers")
                      .pauseFor(2700)
                      .deleteAll()
                      .typeString("Pick your Favs")
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
                  className={index === current ? "slide active" : "slide"}
                >
                  {index === current && (
                    <div className="columns">
                      <div className="column is-mobile-8 is-mobile-offset-2 is-6-tablet">
                        <Link to={`/items/${item._id}`}>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ maxHeight: "14rem" }}
                          />
                        </Link>
                      </div>
                      <div className="column has-text-centered is-6-tablet">
                        <p style={{ color: "#363636" }}>-- By {item.author}</p>
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
              className={current === index ? "dot active" : "dot"}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
        <div className="arrows">
          <span
            className="prev"
            onClick={() => setCurrent(current < 1 ? maxIndex : current - 1)}
          >
            &#10094;
          </span>
          <span
            className="next"
            onClick={() => setCurrent(current === maxIndex ? 0 : current + 1)}
          >
            &#10095;
          </span>
        </div>
      </div>
    )
  );
};

export default Carousel;
