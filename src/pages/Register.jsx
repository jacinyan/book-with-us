import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        alert('infro')
    }

    return (
        <div className="hero is-primary is-fullheight-with-navbar">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="columns">
                        <div className="column is-8 is-offset-2">
                            <h3 className="title has-text-white">Sign Up</h3>
                            <hr className="login-hr" />
                            <p className="subtitle has-text-white">Start the booking with us today!</p>
                            <div className="box">
                                <form>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="text" placeholder="Username" autoFocus="" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input" type="email" placeholder="Email" autoFocus="" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input " type="password" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input className="input " type="password" placeholder="Confirm Password" />
                                        </div>
                                    </div>
                                    <label className="checkbox" style={{ margin: 20 }}>
                                        <input type="checkbox" /> Remember me
                                    </label>
                                    <button className="button is-block is-warning is-fullwidth">Login
                                    </button>
                                </form>
                            </div>
                            <p className="has-text-white">
                                <Link to="">Sign In</Link> &nbsp;·&nbsp;
                                <Link to="">Need Help?</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
