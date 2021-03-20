import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <nav className="navbar is-warning is-transparent">
                <div className="navbar-brand ">
                    <Link className="navbar-item" to="/" style={{padding: 0}}>
                        <img src="assets/logo.png" alt="" style={{ maxHeight: 85 }} />
                        <span style={{paddingLeft: 20}}><strong>BOOK WITH US!</strong></span>
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
                                <Link to="/register" className="button is-light is-small is-rounded">
                                    Sign up
                                </Link>
                                <Link to="/login" className="button is-light is-rounded is-small">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
    )
}

export default Header
