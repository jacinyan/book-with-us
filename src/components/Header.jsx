import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar is-warning is-transparent is-fixed-top">
                <div className="navbar-brand ">
                    <Link className="navbar-item" to="/" >
                        <img src="assets/logo.png" alt="" style={{ maxHeight: 75 }} />
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
                                <Link to="/register" className="button is-primary">
                                    <strong>SIGN UP</strong>
                                </Link>
                                <Link to="/login" className="button is-primary">
                                   <strong>LOG IN</strong>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

export default Header
