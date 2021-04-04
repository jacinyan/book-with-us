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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  // console.log(user);

  // further user details, e.g. user address should be fetched by sending new requests as local storage saves only limited information,
  // No need to fetch information from local storage either, since that requires JSON.parse() that leads to code redundancy
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    // console.count('useEffect --profile triggered')
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.username || success) {
        dispatch({
          type: USER_UPDATE_PROFILE_RESET,
        });
        dispatch(getUserDetails("profile"));
      } else {
        setUsername(user.username);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

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
                <h2 className="mb-4">Profile</h2>
                <div className="box has-shadow">
                  <form onSubmit={handleSubmit}>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          placeholder="Update Username"
                          autoFocus=""
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="email"
                          placeholder="Update Email"
                          autoFocus=""
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input "
                          type="password"
                          placeholder="Update Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <button className="button is-block is-primary is-fullwidth">
                      <strong>Update</strong>
                    </button>
                  </form>
                </div>
              </div>
              <div className="column is-8 ">
                <h2 className="mb-4">Order</h2>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
