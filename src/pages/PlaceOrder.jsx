import React from "react";
import { useSelector, useDispatch } from "react-redux";

import CheckoutSteps from "../components/CheckoutSteps";

const PlaceOrder = () => {
  const cart = useSelector((state) => state.cart);

  return (
    <>
      <section className="py-6">
        <div className="container">
          <CheckoutSteps step1 step2 step3 step4 />
        </div>
      </section>
    </>
  );
};

export default PlaceOrder;
