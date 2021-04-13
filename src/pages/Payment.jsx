import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { savePaymentMethod } from "../redux/actions/cartActions";

import CheckoutSteps from "../components/CheckoutSteps";

const Payment = ({ history }) => {
  console.count("Payment rendered");
  const dispatch = useDispatch();
  
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/place-order");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 page="shipping-payment" />
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <div className="container is-max-desktop has-text-centered">
            <div className="columns">
              <div className="column is-8 is-offset-2">
                <h2 className="title">Payment Method</h2>
                <hr className="login-hr" />
                <div className="box has-shadow">
                  <form onSubmit={handleSubmit}>
                    <h2 className="subtitle">Select Method</h2>
                    <div className="field">
                      <div className="control">
                        <label className="radio">
                          <input
                            type="radio"
                            name="paymentMethod"
                            id="PayPal"
                            value="PayPal"
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          {" "}
                          PayPal or Credit Card
                        </label>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <label className="radio">
                          <input
                            type="radio"
                            name="paymentMethod"
                            id="Stripe"
                            value="Stripe"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          {" "}
                          Stripe
                        </label>
                      </div>
                    </div>

                    <button className="button is-rounded is-block is-primary is-fullwidth">
                      <strong>Continue</strong>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Payment;
