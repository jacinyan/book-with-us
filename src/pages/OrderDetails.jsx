import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../redux/actions/orderActions";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../redux/constants/orderConstants";

import Loader from "../components/Loader";
import Error from "../components/Error";

import { addDecimals } from "../utils/addDecimals";

const OrderDetails = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const [sdkReady, setSdkReady] = useState(false);

  if (order && !loading) {
    //calculate prices
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((prev, curr) => prev + curr.price * curr.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get(
        process.env.REACT_APP_API + "/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || successPay || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, successDeliver, history, userInfo]);

  const handleSuccessPayment = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const handleDeliver = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <>
      <section className="py-6">
        <div className="container is-max-widescreen">
          {loading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : (
            <>
              <h1 className="title hr">Order {order._id}</h1>
              <div className="columns">
                <div className="column is-8">
                    <div className="content">
                      <h3>Shipping</h3>
                      <p>
                        <strong>Name: </strong>
                        {order.user.username}
                      </p>
                      <p>
                        <strong>Email: </strong>
                        <a
                          href={`mailto:${order.user.email}`}
                          className="has-text-primary"
                        >
                          {order.user.email}
                        </a>
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {order.shippingAddress.address},{" "}
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.postalCode},{" "}
                        {order.shippingAddress.country}
                      </p>
                      {order.isDelivered ? (
                        <p className="has-text-success">
                          Delivered on {order.deliveredAt}
                        </p>
                      ) : (
                        <p className="has-text-danger">Not Delivered</p>
                      )}
                    </div>
                    <hr />
                    <div className="content">
                      <h3>Payment Method</h3>
                      <p>
                        <strong>Method: </strong> {order.paymentMethod}
                      </p>
                      {order.isPaid ? (
                        <p className="has-text-success">
                          Paid on {order.paidAt}
                        </p>
                      ) : (
                        <p className="has-text-danger">Not paid</p>
                      )}
                    </div>
                    <hr />
                    <div className="content">
                      <h3>Order Items</h3>
                      {order.orderItems.length === 0 ? (
                        <h3>Order is empty</h3>
                      ) : (
                        <>
                          {order.orderItems.map((orderItem) => (
                            <div className="columns" key={orderItem.item}>
                              <div className="column is-2">
                                <img src={orderItem.image} alt="" />
                              </div>
                              <div className="column is-3 has-text-centered">
                                <Link
                                  to={`/items/${orderItem.item}`}
                                  className="has-text-primary"
                                >
                                  {orderItem.name}
                                </Link>
                              </div>
                              <div className="column is-8 has-text-centered">
                                {orderItem.qty} x $ {orderItem.price} = ${" "}
                                {orderItem.qty * orderItem.price}
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
                        <div className="column">${order.itemsPrice}</div>
                      </div>
                      <div className="columns is-mobile">
                        <div className="column">
                          <strong>Shipping</strong>
                        </div>
                        <div className="column">${order.shippingPrice}</div>
                      </div>
                      <div className="columns is-mobile">
                        <div className="column">
                          <strong>Tax</strong>
                        </div>
                        <div className="column">${order.taxPrice}</div>
                      </div>
                      <div className="columns is-mobile">
                        <div className="column">
                          <strong>Total</strong>
                        </div>
                        <div className="column">${order.totalPrice}</div>
                      </div>
                      <footer className="card-footer pb-0 pt-3" id="order-page">
                        {!order.isPaid && (
                          <>
                            {loadingPay && (
                              <button className="card-footer-item button  is-loading is-fullwidth">
                                Loading
                              </button>
                            )}
                            {!sdkReady ? (
                              <button className="card-footer-item button is-loading is-fullwidth">
                                Loading
                              </button>
                            ) : (
                              <PayPalButton
                                amount={order.totalPrice}
                                onSuccess={handleSuccessPayment}
                              />
                            )}
                          </>
                        )}
                        {loadingDeliver && (
                          <button className="card-footer-item button is-loading is-fullwidth">
                            Loading
                          </button>
                        )}
                        {userInfo &&
                          userInfo.isAdmin &&
                          order.isPaid &&
                          !order.isDelivered && (
                            <button
                              className="button is-primary"
                              onClick={handleDeliver}
                            >
                              Mark as delivered
                            </button>
                          )}
                      </footer>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default OrderDetails;
