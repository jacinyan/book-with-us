import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listItemDetails } from "../redux/actions/itemActions";

import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import Error from "../components/Error";

const ItemPage = ({ history, match }) => {
  const dispatch = useDispatch();
  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    console.log("useEffect -- ItemPage");
    // registered :id
    dispatch(listItemDetails(match.params.id));
  }, [match, dispatch]);

  const handleAddToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <section className="py-6">
      <div className="container">
        <Link className="button is-light my-3 " to="/">
          Go Back
        </Link>

        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <div className="columns is-multiline">
            <div className="column has-text-centered is-6-tablet is-5-desktop ">
              <img
                src={item.image}
                alt={item.name}
                style={{ maxHeight: "75vh" }}
              />
            </div>
            <div className="column is-8-mobile is-offset-2-mobile is-6-tablet is-4-desktop">
              <ul className="content">
                <li>
                  <h3>{item.name}</h3>
                </li>
                <li>
                  <Rating
                    value={item.rating}
                    text={`${item.numReviews} reviews`}
                    color="#f8d125"
                  />
                </li>
                <li>Price: ${item.price}</li>
                <li>Description: {item.description}</li>
              </ul>
            </div>
            <div className="column is-8-mobile is-offset-2-mobile is-6-tablet is-3-desktop">
              <div className="card">
                <div className="card-content">
                  <p className="title is-6">Status</p>
                  <p className="subtitle is-6">
                    {item.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </p>
                  {item.countInStock > 0 && (
                    <div className="columns is-mobile is-2 is-vcentered">
                      <div className="column">
                        <p>Qty</p>
                      </div>
                      <div className="column is-8">
                        <div className="select is-primary">
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(item.countInStock).keys()].map(
                              (index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <footer className="card-footer pb-0 ">
                  <button
                    className="card-footer-item button py-3 has-background-primary has-text-white"
                    disabled={item.countInStock === 0}
                    onClick={handleAddToCart}
                  >
                    <strong>Add to Cart</strong>
                  </button>
                </footer>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ItemPage;
