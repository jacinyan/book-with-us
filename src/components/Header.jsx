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
            <nav className="navbar is-warning is-transparent is-fixed-top">
                <div className="navbar-brand ">
                    <Link className="navbar-item" to="/" >
                        <img src="assets/logo.png" alt="" style={{ maxHeight: 50 }} />
                    </Link>
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
                                    <>
                                        <Link to="/register" className="button is-primary is-small">
                                            <strong>SIGN UP</strong>
                                        </Link>
                                        <Link to="/login" className="button is-primary is-small">
                                            <strong>LOG IN</strong>
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
            </nav>
        </header>

    )
}

export default Header
