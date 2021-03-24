import React, { useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        alert('infro')
    }


    return (
        <div className="hero is-primary is-fullheight">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <div className="columns">
                        <div className="column is-8 is-offset-2">
                            <h3 className="title has-text-white">Login</h3>
                            <hr className="login-hr" />
                            <p className="subtitle has-text-white">Please login to start booking!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
