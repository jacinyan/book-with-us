import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/actions/userActions'

const Header = () => {
    const dispatch = useDispatch()
    const loginState = useSelector(state => state.login)
    const { userInfo } = loginState

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
    }

    return (
        <header>
            <nav className="navbar is-transparent is-fixed-top has-shadow">
                <div className="container is-fluid">
                    <div className="navbar-brand ">
                        <Link className="navbar-item" to="/" >
                            <img src="assets/logo.png" alt="BooksRUs Logo" />
                        </Link>
                        <div className="navbar-item has-dropdown is-boxed is-hoverable">
                            <Link className="navbar-link has-text-primary" to="#">
                                Docs
                            </Link>
                            <div className="navbar-dropdown">
                                <Link className="navbar-item" to="#">
                                    Overview
                                </Link>
                                <Link className="navbar-item" to="#">
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
                                    <Link to="/cart" className="navbar-item has-text-primary">
                                        <i className="fas fa-shopping-cart"></i>
                                        Cart
                                    </Link>

                                    <div className="navbar-item">
                                        <Link to="/register" className="button has-text-white is-primary">
                                            Sign Up
                                        </Link>
                                    </div>

                                    <Link to="/login" className="navbar-item has-text-primary">
                                        <i className="fas fa-user"></i>
                                    Log In
                                    </Link>
                                    
                                </>
                                :
                                <>
                                    <div className="navbar-item " onClick={handleLogout}>
                                        <Link to="#" className="has-text-primary">
                                            Log Out
                                        </Link>
                                    </div>
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
