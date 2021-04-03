import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getUserDetails } from "../redux/actions/userActions";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Profile = ({ location, history }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.username) {
        dispatch(getUserDetails("profile"));
      } else {
        setUsername(user.username);
        setUsername(user.email);
      }
    }
  }, [dispatch, history, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      //   dispatch(register(username, email, password));
    }
  };

  return (
    <section className="py-6">
      <div className="container ">
        <div className="columns is-multiline">
          <div className="column is-3">
            <form onSubmit={handleSubmit}>
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Username"
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
                    placeholder="Email"
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
                    placeholder="Password"
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
                <strong>Sign Up</strong>
              </button>
            </form>
          </div>
          <div className="column is-9">Profile</div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
