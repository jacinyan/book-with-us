import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";
import { listMyOrders } from "../redux/actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants";

import Loader from "../components/Loader";
import Error from "../components/Error";

const Profile = ({ history }) => {
  console.count("Profile rendered");
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  // console.log(user);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, orders } = orderListMy;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    console.count("useEffect -- Profile");
    if (!user || !user.username || success) {
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
      dispatch(getUserDetails("profile"));
      dispatch(listMyOrders());
    } else {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [dispatch, history, user, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          username,
          email,
          password,
        })
      );
    }
  };

  return (
    <section className="py-6">
      <div className="container ">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          <div className="columns is-multiline">
            <div className="column is-8-mobile is-offset-1-mobile is-4-tablet">
              <h2 className="mb-4 title hr">My Profile</h2>
              <div className="box has-shadow">
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <div className="control has-icons-left ">
                      <input
                        className="input"
                        type="text"
                        placeholder="Update Username"
                        autoFocus=""
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-user"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="email"
                        placeholder="Update Email"
                        autoFocus=""
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input "
                        type="password"
                        placeholder="Update Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <button className="button is-block is-primary is-fullwidth">
                    <strong>Update</strong>
                  </button>
                </form>
              </div>
            </div>
            <div className="column is-8-mobile is-offset-1-mobile is-8-tablet ">
              <h2 className="mb-4 title hr">My Orders</h2>
              {loadingOrders ? (
                <Loader />
              ) : (
                <div className="table-container">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>ID</th>
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
                          <td>{order.createdAt.substring(0, 10)}</td>
                          <td>${order.totalPrice}</td>
                          <td>
                            {order.isPaid ? (
                              order.paidAt.substring(0, 10)
                            ) : (
                              <span className="has-text-danger">
                                <i className="fas fa-times "></i>
                              </span>
                            )}
                          </td>
                          <td>
                            {order.isDelivered ? (
                              order.deliveredAt.substring(0, 10)
                            ) : (
                              <span className="has-text-danger">
                                <i className="fas fa-times "></i>
                              </span>
                            )}
                          </td>
                          <td>
                            <Link to={`/orders/${order._id}`}>
                              <button className="button is-light is-small">
                                Details
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
