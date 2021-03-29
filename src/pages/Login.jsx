import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { login } from '../redux/actions/userActions'

const Login = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const loginState = useSelector(state => state.login)
    const { userInfo } = loginState

    // check login state
    const redirect = location.search ? location.search.split('=')[1] : '/'

    // if logged in, login button disabled
    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className="hero is-primary is-fullheight-with-navbar">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="columns">
                        <div className="column is-8 is-offset-2">
                            <h3 className="title has-text-white">Welcome to BooksRUS</h3>
                            <hr className="login-hr" />
                            <p className="subtitle has-text-white">Pick your fav books today!</p>
                            <div className="box has-shadow">
                                <form onSubmit={handleSubmit}>
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
                                    <button className="button is-block is-warning is-fullwidth">
                                        <strong>Log in</strong>
                                    </button>
                                </form>
                            </div>
                            <p className="has-text-white">
                                New User?{'  '}
                                <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
