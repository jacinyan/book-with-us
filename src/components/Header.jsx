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
                            <img src="assets/logo.png" alt="" style={{ maxHeight: 70 }} />
                        </Link>
                        <div className="navbar-item has-dropdown is-boxed is-hoverable">
                            <Link className="navbar-link has-text-primary" to="#">
                                <strong>Docs</strong>
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
                            <div className="navbar-item">
                                <div className="buttons">
                                    {userInfo === null ?
                                        <> <Link to="/cart" className="button is-warning is-default has-text-primary">
                                        <strong>Cart</strong>
                                    </Link>
                                            <Link to="/register" className="button is-primary is-default">
                                                <strong>Sign Up</strong>
                                            </Link>
                                            <Link to="/login" className="button is-warning is-default has-text-primary">
                                                <strong>Log In</strong>
                                            </Link>
                                        </>
                                        :
                                        <>
                                            <button className="button is-primary is-small" onClick={handleLogout}>
                                                <strong>LOG OUT</strong>
                                            </button>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>

    )
}

export default Header
