import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { register } from '../redux/actions/regActions'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const regState = useSelector(state => state.reg)
    console.log(regState);

    const handleSubmit = e => {
        e.preventDefault()
        console.table({ username, email, password, confirmPassword });
        dispatch(register(username, email, password, confirmPassword))
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
                            <div className="box has-shadow">
                                <form onSubmit={handleSubmit}>
                                    <div className="field">
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="Username"
                                                autoFocus=""
                                                value={username}
                                                onChange={e => setUsername(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="email"
                                                placeholder="Email"
                                                autoFocus=""
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input
                                                className="input "
                                                type="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="control">
                                            <input
                                                className="input"
                                                type="password"
                                                placeholder="Confirm Password"
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <label className="checkbox" style={{ margin: 20 }}>
                                        <input type="checkbox" />Remember me
                                    </label>
                                    <button className="button is-block is-warning is-fullwidth">
                                        <strong>Sign Up</strong>
                                    </button>
                                </form>
                            </div>
                            <p className="has-text-white">
                                <Link to="">Sign In</Link>&nbsp;·&nbsp;
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
