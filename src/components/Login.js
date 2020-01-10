import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { api } from '../services/api';
import { SIGN_IN as SignIn } from '../actions/auth'


const Login = props => {

    const token = localStorage.getItem('token');
    
    useEffect(() => {
        if(token) {
            api.auth.getCurrentUser().then(user => {
                if (!user.error) {
                    props.history.push("/");
                }
            });
        }
    },[props, token]);

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
                    dispatch(SignIn(resp));
                    localStorage.setItem("token", resp.jwt)
                    props.history.push('/');
                }
        })
    }
    
    if (token) {
        return null;
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