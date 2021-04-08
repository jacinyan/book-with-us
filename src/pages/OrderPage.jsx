import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getOrderDetails } from "../redux/actions/orderActions";

import Loader from "../components/Loader";
import Error from "../components/Error";

import { addDecimals } from "../utils/addDecimals";

const OrderPage = ({ match }) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderId = match.params.id;

  if (!loading) {
    //calculate prices
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((prev, curr) => prev + curr.price * curr.qty, 0)
    );
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

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
              <h1 className="title">Order {order._id}</h1>
              <hr />
              <div className="columns">
                <div className="column is-8">
                  <ul>
                    <li className="content">
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
                        <p className="has-text-success">Delivered on {order.deliveredAt}</p>
                      ) : (
                        <p className="has-text-danger">Not Delivered</p>
                      )}
                    </li>
                    <hr />
                    <li className="content">
                      <h3>Payment Method</h3>
                      <p>
                        <strong>Method: </strong> {order.paymentMethod}
                      </p>
                      {order.isPaid ? (
                        <p className="has-text-danger">Paid on {order.paidAt}</p>
                      ) : (
                        <p className="has-text-danger">Not paid</p>
                      )}
                    </li>
                    <hr />
                    <li className="content">
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
                      <footer className="card-footer pb-0 ">
                        {/* <button
                        className="card-footer-item button py-3 has-background-primary has-text-white"
                        disabled={order.orderItems.length === 0}
                        onClick={handlePlaceOrder}
                      >
                        <strong>Place Order</strong>
                      </button> */}
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

export default OrderPage;
