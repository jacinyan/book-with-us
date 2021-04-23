import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { createOrder } from "../redux/actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";

import { ORDER_CREATE_RESET } from "../redux/constants/orderConstants";
import { USER_DETAILS_RESET } from "../redux/constants/userConstants";

import { addDecimals } from "../utils/addDecimals";

const PlaceOrder = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success } = orderCreate;

  if (!cart.shippingAddress.address) {
    history.push("/shipping");
  } else if (!cart.paymentMethod) {
    history.push("/payment");
  }

  //calculate prices
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((prev, curr) => prev + curr.price * curr.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 20 ? 0 : 20);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  useEffect(() => {
    if (success) {
      history.push(`/orders/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [history, success, order, dispatch]);

  const handlePlaceOrder = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <section className="py-6">
      <div className="container is-max-widescreen">
        <CheckoutSteps step1 step2 step3 step4 />
        <div className="columns">
          <div className="column is-8">
            <div className="content">
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div className="content">
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {cart.paymentMethod}
              </p>
            </div>
            <div className="content">
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <h3>Your cart is empty</h3>
              ) : (
                <>
                  {cart.cartItems.map((cartItem) => (
                    <div className="columns" key={cartItem.item}>
                      <div className="column is-2">
                        <img src={cartItem.image} alt="" />
                      </div>
                      <div className="column is-3 has-text-centered">
                        <Link
                          to={`/items/${cartItem.item}`}
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
            </div>
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
              </div>
              <footer className="card-footer p-4 ">
                <button
                  className="card-footer-item button is-rounded has-background-primary has-text-white"
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
    </section>
  );
};

export default PlaceOrder;
