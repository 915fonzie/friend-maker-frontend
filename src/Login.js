import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { api } from './services/api';


const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault()
        api.auth.login({ username, password })
            .then(resp => {
                if (resp.error) {
                    console.log(resp.error)
                }
                else {
                    console.log(resp)
                }
        })
    }
    

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={handleUsernameChange} placeholder="username..."/>
                <input type="password" value={password} onChange={handlePasswordChange} placeholder="password..." />
                <input type="submit"/>
            </form>
        </div>
    );
}

export default Login;