import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  listItemDetails,
  createItemReview,
} from "../redux/actions/itemActions";
import { addToCart } from "../redux/actions/cartActions";

import { ITEM_CREATE_REVIEW_RESET } from "../redux/constants/itemConstants";

import Loader from "../components/Loader";
import Rating from "../components/Rating";
import Error from "../components/Error";
import Meta from "../components/Meta";

const ItemDetails = ({ history, match }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const itemDetails = useSelector((state) => state.itemDetails);
  const { loading, error, item } = itemDetails;

  const itemReviewCreate = useSelector((state) => state.itemReviewCreate);
  const { success: successItemReview } = itemReviewCreate;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // console.count("useEffect -- ItemDetails triggered");
    // registered :id
    if (successItemReview) {
      // console.log("useEffect -- successItemReview triggered");
      alert("Review submitted");
      setRating(0);
      setComment("");
      dispatch({ type: ITEM_CREATE_REVIEW_RESET });
    }
    // console.log("useEffect -- match.params.id triggered");
    // console.count("useEffect -- match.params.id triggered");
    dispatch(listItemDetails(match.params.id));
  }, [match.params.id, dispatch, successItemReview]);

  const handleAddToCart = () => {
    dispatch(addToCart(item._id, Number(qty)));
    history.push("/cart");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createItemReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <section className="py-6">
      <div className="container is-max-widescreen">
        <Link className="button is-rounded is-light my-3 " to="/">
          Go Back
        </Link>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <>
            <Meta title={item.name} />
            <div className="columns is-multiline">
              <div className="column has-text-centered is-6-tablet is-5-desktop ">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ maxHeight: "47vh" }}
                />
              </div>
              <div className="column is-8-mobile is-offset-2-mobile is-6-tablet is-4-desktop">
                <div className="content">
                  <h3>{item.name}</h3>
                  <Rating
                    value={item.rating}
                    text={
                      item.numReviews > 1
                        ? `${item.numReviews} reviews`
                        : `${item.numReviews} review`
                    }
                    color="#f8d125"
                  />
                  <p>Price: ${item.price}</p>
                  <p>Description: {item.description}</p>
                </div>
              </div>
              <div className="column is-8-mobile is-offset-2-mobile is-6-tablet is-3-desktop">
                <div className="card">
                  <div className="card-content">
                    <p className="title is-6">Status</p>
                    <p className="subtitle is-6">
                      {item.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </p>
                    {item.countInStock > 0 && (
                      <div className="columns is-mobile is-2 is-vcentered is-centered">
                        <div className="column is-5">
                          <p>Quantity</p>
                        </div>
                        <div className="column is-7 ">
                          <div className="select is-primary is-fullwidth">
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
                  <footer className="card-footer p-4">
                    <button
                      className="card-footer-item button has-background-primary has-text-white is-rounded "
                      disabled={item.countInStock === 0}
                      onClick={handleAddToCart}
                    >
                      <strong>Add to Cart</strong>
                    </button>
                  </footer>
                </div>
              </div>
              <div className="column is-8-mobile is-offset-2-mobile is-6-tablet is-5-desktop">
                <div className="content">
                  <h3>Reviews</h3>
                  {item.reviews.length === 0 && (
                    <p className="has-text-info">No Reviews</p>
                  )}
                  {item.reviews.map((review) => (
                    <Fragment key={review._id}>
                      <strong>{review.username}</strong>
                      <Rating value={review.rating} color="#f8d125"></Rating>
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                      <hr />
                    </Fragment>
                  ))}
                  <h3>Write a customer review</h3>
                  {userInfo ? (
                    <form onSubmit={handleSubmit}>
                      <div className="field">
                        <div className="control is-expanded">
                          <div className="select is-primary is-fullwidth">
                            <select
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <div className="control">
                          <textarea
                            className="textarea"
                            placeholder="Comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>
                      </div>
                      <button className="button is-primary is-rounded">
                        <strong>Submit Review</strong>
                      </button>
                    </form>
                  ) : (
                    <p>
                      Please{" "}
                      <Link to="/login" className="has-text-primary">
                        sign in
                      </Link>{" "}
                      to write a review
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ItemDetails;
