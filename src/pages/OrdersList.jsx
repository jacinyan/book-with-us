import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { listOrders } from "../redux/actions/orderActions";

import Loader from "../components/Loader";
import Error from "../components/Error";

const OrdersList = ({ history }) => {
  const dispatch = useDispatch();
  
  const ordersList = useSelector((state) => state.ordersList);
  const { loading, error, orders } = ordersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/')
    }
    //successDelete added to trigger useEffect
  }, [dispatch, history, userInfo]);

  return (
    <section className="py-6">
      <div className="container is-max-widescreen">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <>
            <h1 className="mb-5 title hr">Orders</h1>
            <div className="table-container">
              <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.user && order.user.username}</td>
                      <td>
                        {order.createdAt.substring(0,10)}
                      </td>
                      <td>
                        ${order.totalPrice}
                      </td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <span className="has-text-danger">
                            <i className="fas fa-times"></i>
                          </span>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <span className="has-text-danger">
                            <i className="fas fa-times"></i>
                          </span>
                        )}
                      </td>
                      <td>
                        <Link to={`/orders/${order._id}`}>
                          <button className="button is-rounded is-light is-small">
                            Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default OrdersList;
