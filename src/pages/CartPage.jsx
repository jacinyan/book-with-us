import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartPage = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = () => {
    history.push(`/login?redirect=shipping`);
  };
  return (
    <section className="py-6">
      <div className="container">
        <div className="columns is-multiline">
          <div className="column is-8">
            <h1 className="mb-5 title hr">Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <h3>
                Your cart is empty{"  "}
                <Link to="/" className="has-text-primary">
                  Go Back
                </Link>
              </h3>
            ) : (
              cartItems.map((cartItem) => (
                <Fragment key={cartItem.item}>
                  <div className="columns is-vcentered">
                    <div className="column is-1 ">
                      <button
                        className="button is-rounded is-small"
                        onClick={() => {
                          handleRemoveFromCart(cartItem.item);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                    <div className="column is-4 has-text-centered">
                      <img
                        src={cartItem.image}
                        alt={cartItem.name}
                        style={{ maxHeight: 160 }}
                      />
                    </div>
                    <div className="column is-3">
                      <Link
                        to={`/items/${cartItem.item}`}
                        className="has-text-primary"
                      >
                        {cartItem.name}
                      </Link>
                    </div>
                    <div className="column is-2">
                      <span className="price">${cartItem.price}</span>
                    </div>
                    <div className="column is-2 ">
                        <div className="select is-primary is-fullwidth">
                          <select
                            value={cartItem.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(cartItem.item, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(cartItem.countInStock).keys()].map(
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
                </Fragment>
              ))
            )}
          </div>
          <div className="column is-4">
            <div className="card">
              <div className="card-content">
                <p className="title is-4">
                  Subtotal (
                  {cartItems.reduce((prev, curr) => prev + curr.qty, 0)}) items
                </p>
                <p className="subtitle is-6">
                  $
                  {cartItems
                    .reduce((prev, curr) => prev + curr.qty * curr.price, 0)
                    .toFixed(2)}
                </p>
                <footer className="card-footer pb-0 ">
                  <button
                    className="card-footer-item button is-rounded py-3 has-background-primary has-text-white"
                    disabled={cartItems.length === 0}
                    onClick={handleCheckout}
                  >
                    <strong>Proceed to Checkout</strong>
                  </button>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
