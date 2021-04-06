import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);

  //calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((prev, curr) => prev + curr.price * curr.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const handlePlaceOrder = () => {};

  return (
    <>
      <section className="py-6">
        <div className="container is-max-widescreen">
          <CheckoutSteps step1 step2 step3 step4 />
          <div className="columns">
            <div className="column is-8">
              <ul>
                <li className="content">
                  <h2>Shipping</h2>
                  <p>
                    <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                    {cart.shippingAddress.city},{" "}
                    {cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.country}
                  </p>
                </li>
                <li className="content">
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
                </li>
                <li className="content">
                  <h2>Order Items</h2>
                  {cart.cartItems.length === 0 ? (
                    <h3>Your cart is empty</h3>
                  ) : (
                    <>
                      {cart.cartItems.map((cartItem, index) => (
                        <div className="columns" key={index}>
                          <div className="column is-2">
                            <img src={cartItem.image} alt="" />
                          </div>
                          <div className="column is-3 has-text-centered">
                            <Link
                              to={`/products/${cartItem.item}`}
                              className="has-text-primary"
                            >
                              {cartItem.name}
                            </Link>
                          </div>
                          <div className="column is-8 has-text-centered">
                            {cartItem.qty} x $ {cartItem.price} = ${" "}
                            {cartItem.qty * cartItem.price}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </li>
              </ul>
            </div>
            <div className="column is-4">
              <div className="card">
                <div className="card-content">
                  <p className="title">Order Summary</p>
                  <div className="columns is-mobile">
                    <div className="column">
                      <strong>Items</strong>
                    </div>
                    <div className="column">${cart.itemsPrice}</div>
                  </div>
                  <div className="columns is-mobile">
                    <div className="column">
                      <strong>Shipping</strong>
                    </div>
                    <div className="column">${cart.shippingPrice}</div>
                  </div>
                  <div className="columns is-mobile">
                    <div className="column">
                      <strong>Tax</strong>
                    </div>
                    <div className="column">${cart.taxPrice}</div>
                  </div>
                  <div className="columns is-mobile">
                    <div className="column">
                      <strong>Total</strong>
                    </div>
                    <div className="column">${cart.totalPrice}</div>
                  </div>
                  <footer className="card-footer pb-0 ">
                    <button
                      className="card-footer-item button py-3 has-background-primary has-text-white"
                      disabled={cart.cartItems.length === 0}
                      onClick={handlePlaceOrder}
                    >
                      <strong>Place Order</strong>
                    </button>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlaceOrder;
