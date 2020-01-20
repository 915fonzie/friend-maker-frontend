import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { api } from '../services/api';
import { SIGN_IN as SignIn } from '../actions/auth'
import { Link } from 'react-router-dom'


const Login = props => {

    const token = localStorage.getItem('token');
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(token) {
            api.auth.getCurrentUser().then(user => {
              if (!user.error) {
                  console.log("it hits")
                    props.history.push("/search-for-friends");
                    dispatch(SignIn(user));
              }
              else {
                console.log(user.error)
              }
            });
        }
    },[props, token, dispatch]);

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    const handleSubmit = async e => {
        e.preventDefault()
        await api.auth.login({ username, password })
            .then(resp => {
                if (resp.error) {
                    console.log(resp.error)
                }
                else {
                    console.log("it hits where it should")
                  dispatch(SignIn(resp));
                  localStorage.setItem("token", resp.jwt)
                }
            })
              props.history.push("/search-for-friends");
    }
    
    if (token) {
        return null;
    }
    return (
      <div className="uk-card uk-card-default uk-card-small uk-position-center">
        <form onSubmit={handleSubmit}>
          <fieldset className="uk-fieldset">
            <legend className="legend uk-h1 uk-position-top-center uk-position-medium">
              Login
            </legend>
            <input
              className="uk-input uk-margin-top"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="username..."
            />
            <input
              className="uk-input uk-margin"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="password..."
            />
            <div className="uk-flex">
              <input className="uk-button uk-button-primary" type="submit" />
              <Link to="/signup">
                <p className="uk-margin-left">Don't have an Account?</p>
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    );
}

export default Login;