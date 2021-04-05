import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getUserDetails,
  updateUserProfile,
} from "../redux/actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../redux/constants/userConstants";

import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Error from "../components/Error";

const Profile = ({ history }) => {
  // console.count('Profile rendered')
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  // console.log(user);
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!user || !user.username || success) {
      dispatch({
        type: USER_UPDATE_PROFILE_RESET,
      });
      dispatch(getUserDetails("profile"));
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
    <>
      <section className="py-6">
        <div className="container ">
          {loading ? (
            <Loader />
          ) : error ? (
            <Error />
          ) : (
            <div className="columns is-multiline">
              <div className="column is-4">
                <h2 className="mb-4 title">Profile</h2>
                <hr />
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
              <div className="column is-8 ">
                <h2 className="mb-4 title">Order</h2>
              <hr className="login-hr" />
              <p>1</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
