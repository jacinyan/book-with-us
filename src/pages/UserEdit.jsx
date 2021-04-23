import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { getUserDetails, updateUser } from "../redux/actions/userActions";
import { USER_UPDATE_RESET } from "../redux/constants/userConstants";

import Loader from "../components/Loader";
import Error from "../components/Error";

const UserEdit = ({ history, match }) => {
  const userId = match.params.id;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
  } = userUpdate;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/users-list");
    } else {
      if (!user.username || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setUsername(user.username);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, successUpdate, history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, username, email, isAdmin }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <section className="hero is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container is-max-desktop has-text-centered">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <h2 className="mb-4 title">Edit User</h2>
                  <hr className="login-hr" />
                  <div className="box has-shadow">
                    <form onSubmit={handleSubmit}>
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            type="text"
                            placeholder="Username"
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
                            placeholder="Email"
                            autoFocus=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />

                          <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field has-text-left">
                        <div className="control">
                          <label htmlFor="isAdmin" className="checkbox">
                            <input
                              type="checkbox"
                              checked={isAdmin}
                              onChange={(e) => setIsAdmin(e.target.checked)}
                              id="isAdmin"
                            />{" "}
                            Is Admin
                          </label>
                        </div>
                      </div>
                      <div className="field is-grouped is-grouped-right">
                        <p className="control">
                          <button className="button is-rounded  is-primary">
                            <strong>Update</strong>
                          </button>
                        </p>
                        <p className="control">
                          <Link
                            to="/admin/users-list"
                            className="button is-rounded is-light "
                          >
                            Go Back
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UserEdit;
