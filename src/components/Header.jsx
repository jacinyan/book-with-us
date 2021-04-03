import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <header>
      <nav className="navbar is-transparent is-fixed-top has-shadow">
        <div className="container is-fluid">
          <div className="navbar-brand ">
            <Link className="navbar-item" to="/">
              <img src="/assets/logo.png" alt="BooksRUs Logo" />
            </Link>

            <Link to="#" className="navbar-burger">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </Link>
          </div>

          <div className="navbar-menu">
            <div className="navbar-end">
              <Link to="/cart" className="navbar-item has-text-primary">
                <i className="fas fa-shopping-cart"></i>
                Cart
              </Link>
              {!userInfo ? (
                <>
                  <div className="navbar-item">
                    <Link
                      to="/register"
                      className="button has-text-white is-primary"
                    >
                      <strong>Sign Up</strong>
                    </Link>
                  </div>
                  <Link to="/login" className="navbar-item has-text-primary">
                    <i className="fas fa-user"></i>
                    Sign In
                  </Link>
                </>
              ) : (
                <>
                  <div className="navbar-item has-dropdown is-boxed is-hoverable">
                    <Link className="navbar-link has-text-primary" to="#">
                      {userInfo.username}
                    </Link>
                    <div className="navbar-dropdown">
                      <Link
                        className="navbar-item has-text-primary"
                        to="/users/profile"
                      >
                        Profile
                      </Link>
                      <hr className="navbar-divider"></hr>
                      <div className="navbar-item " onClick={handleLogout}>
                        <Link to="#" className="has-text-grey">
                          Log Out
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
