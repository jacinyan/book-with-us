import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { register } from '../redux/actions/userActions'
import { toast } from 'react-toastify'

const Register = ({ location, history }) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const registerState = useSelector(state => state.register)
    const { userInfo } = registerState

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const handleSubmit = e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            dispatch(register(username, email, password))
        }
    }

    return (
        <div className="hero is-primary is-fullheight-with-navbar">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="columns">
                        <div className="column is-8 is-offset-2">
                            <h3 className="title has-text-white">Welcome to BookWithUS</h3>
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
                                    <button className="button is-block is-warning is-fullwidth">
                                        <strong>Sign Up</strong>
                                    </button>
                                </form>
                            </div>
                            <p className="has-text-white">
                                Already a user?{'  '}
                                <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
