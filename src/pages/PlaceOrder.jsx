import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <section className="py-6">
        <div className="container is-max-widescreen">
          <CheckoutSteps step1 step2 step3 step4 />
          <div className="columns">
            <div className="column is-7">
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
                    <strong>Method:</strong>{" "}{cart.paymentMethod}
                  </p>
                </li>
                <li className="content">
                  <h2>Order Items</h2>
                  {cart.cartItems.length === 0 ? <h3>Your cart is empty</h3>:
                  (
                    <>
                    {
                      cart.cartItems.map((cartItem, index)=>
                          <div className="columns" key={index}>
                            <div className="column is-1">
                              <img src={cartItem.image} alt=""/>
                            </div>
                            <div className="column is-3">
                              <Link to={`/products/${cartItem.item}`} className="has-text-primary">
                                {cartItem.name}
                              </Link>
                            </div>
                            <div className="column is-8">
                                {cartItem.qty} x $ {cartItem.price} = $ {cartItem.qty * cartItem.price}
                            </div>
                          </div>
                      )
                    }
                    </>
                  )}
                </li>
              </ul>
            </div>
            <div className="column is-5">

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlaceOrder;
