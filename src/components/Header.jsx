import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { logout } from "../redux/actions/userActions";

import SearchBox from "./SearchBox";

const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.replace('/login')
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
            <div className="navbar-start">
              <SearchBox />
            </div>
            <div className="navbar-end">
              <Link to="/cart" className="navbar-item has-text-primary">
                <span className="icon-text">
                  <span className="icon">
                    <i className="fas fa-shopping-cart"></i>
                  </span>
                  <span>Cart</span>
                </span>
              </Link>
              {!userInfo ? (
                <>
                  <div className="navbar-item">
                    <Link
                      to="/register"
                      className="button is-rounded has-text-white is-primary"
                    >
                      <strong>Sign Up</strong>
                    </Link>
                  </div>
                  <Link to="/login" className="navbar-item has-text-primary">
                    <span className="icon-text">
                      <span className="icon">
                        <i className="fas fa-user"></i>
                      </span>
                      <span>Sign In</span>
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  {!userInfo.isAdmin && (
                    <div className="navbar-item has-dropdown is-boxed is-hoverable">
                      <Link className="navbar-link has-text-primary" to="#">
                        {userInfo.username}
                      </Link>
                      <div className="navbar-dropdown">
                        <Link
                          className="navbar-item has-text-primary"
                          to="/profile"
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
                  )}
                  {userInfo.isAdmin && (
                    <div className="navbar-item has-dropdown is-boxed is-hoverable">
                      <Link className="navbar-link has-text-primary" to="#">
                        Admin
                      </Link>
                      <div className="navbar-dropdown">
                        <Link
                          className="navbar-item has-text-primary"
                          to="/admin/users-list"
                        >
                          Users
                        </Link>
                        <Link
                          to="/admin/items-list"
                          className="navbar-item has-text-primary"
                        >
                          Items
                        </Link>
                        <Link
                          to="/admin/orders-list"
                          className="navbar-item has-text-primary"
                        >
                          Orders
                        </Link>
                        <hr className="navbar-divider"></hr>
                        <div className="navbar-item " onClick={handleLogout}>
                          <Link to="#" className="has-text-grey">
                            Log Out
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
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
