import React from "react";
import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="breadcrumb is-centered">
      <ul>
        {step1 ? (
          <li>
            <Link to="/login">Sign In</Link>
          </li>
        ) : (
          <li>
            <p className="px-3">Sign In</p>
          </li>
        )}
        {step2 ? (
          <li>
            <Link to="/shipping">Shipping</Link>
          </li>
        ) : (
          <li>
            <p className="px-3">Shipping</p>
          </li>
        )}
        {step3 ? (
          <li>
            <Link to="/payment">Payment</Link>
          </li>
        ) : (
          <li>
            <p className="px-3">Payment</p>
          </li>
        )}
        {step4 ? (
          <li>
            <Link to="/place-order">Place Order</Link>
          </li>
        ) : (
          <li>
            <p className="px-3">Place Order</p>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default CheckoutSteps;
