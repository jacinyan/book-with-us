import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { login } from "../redux/actions/userActions";

import Loader from "../components/Loader";
import { toast } from "react-toastify";

const Login = ({ location, history }) => {
  // console.count('Login rendered')
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo } = userLogin;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search
    ? new URLSearchParams(location.search).get("redirect")
    : "";

  useEffect(() => {
    if (userInfo) {
      history.push(`/${redirect}`);
    } else if (!userInfo && redirect === "shipping") {
      toast.info("Please login before checkout");
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="hero is-primary is-fullheight-with-navbar">
          <div className="hero-body">
            <div className="container is-max-desktop has-text-centered">
              <div className="columns">
                <div className="column is-8 is-offset-2">
                  <h3 className="title has-text-white">Welcome to BooksRUS</h3>
                  <hr className="login-hr" />
                  <p className="subtitle has-text-white">
                    Pick your fav books today!
                  </p>
                  <div className="box has-shadow">
                    <form onSubmit={handleSubmit}>
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
                      <div className="field">
                        <div className="control has-icons-left">
                          <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <span className="icon is-small is-left">
                            <i className="fas fa-lock"></i>
                          </span>
                        </div>
                      </div>
                      <button className="button is-rounded is-block is-primary is-fullwidth">
                        <strong>Sign In</strong>
                      </button>
                    </form>
                  </div>
                  <p>
                    New Customer?{"  "}
                    <Link
                      to={
                        redirect
                          ? `/register?redirect=${redirect}`
                          : "/register"
                      }
                      className="has-text-white"
                    >
                      Sign Up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
