import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/userActions'

const Header = () => {
    const dispatch = useDispatch()
    const loginState = useSelector(state => state.login)
    const { userInfo } = loginState

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <header>
            <nav className="navbar is-warning is-fixed-top">
                <div className="container is-fluid">
                    <div className="navbar-brand ">
                        <Link className="navbar-item" to="/" >
                            <img src="assets/logo.png" alt="" />
                        </Link>
                        <div className="navbar-item has-dropdown is-boxed is-hoverable">
                            <Link className="navbar-link has-text-primary" to="#">
                                Docs
                            </Link>
                            <div className="navbar-dropdown">
                                <Link className="navbar-item">
                                    Overview
                                </Link>
                                <Link className="navbar-item">
                                    Elements
                                </Link>
                            </div>
                        </div>
                        <Link to="#" className="navbar-burger" >
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </Link>
                    </div>

                    <div className="navbar-menu">
                        <div className="navbar-end">
                            {userInfo === null ?
                                <> 
                                <Link to="/cart" className="navbar-item is-warning is-default has-text-primary">
                                    <i className="fas fa-shopping-cart"></i>Cart
                                    </Link>
                                    <Link to="/register" className=" navbar-item is-primary is-default">
                                        Sign Up
                                    </Link>
                                    <Link to="/login" className="navbar-item is-warning is-default has-text-primary">
                                        <i className="fas fa-user"></i>
                                    Log In
                                    </Link>
                                </>
                                :
                                <>
                                    <button className="navbar-item is-primary is-small" onClick={handleLogout}>
                                        Log Out
                                            </button>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Header
