import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../services/api";
import { SIGN_IN as SignIn } from "../actions/auth";
import Select from 'react-select'
import './SignUp.css'

const SignUp = props => {
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            api.auth.getCurrentUser().then(user => {
                if (!user.error) {
                    props.history.push("/");
                    return null;
                }
            }); 
        }
        else {
            handleFetchingInterests()
        }
    }, [props, token]);
    
    const [interests, setInterests] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [friendBio, setFriendBio] = useState("");

    console.log(interests);

    const dispatch = useDispatch();

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    };
    const handleFirstNameChange = e => {
        setFirstName(e.target.value);
    };
    const handleLastNameChange = e => {
        setLastName(e.target.value);
    };
    
    const handleEmailChange = e => {
        setEmail(e.target.value);
    };

    const handleBioChange = e => {
        setBio(e.target.value)
    };

    const handleFriendBioChange = e => {
        setFriendBio(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault();
    
        await api.createUser.signup({
          first_name: firstName,
          last_name: lastName,
          email: email, username: username,
          password: password,
          bio: bio,
          ideal_friend_bio: friendBio,
        })
      
        api.auth.login({ username, password }).then(resp => {
            if (resp.error) {
                console.log(resp.error);
            } else {
                console.log(resp);
                dispatch(SignIn(resp));
                localStorage.setItem("token", resp.jwt);
                props.history.push("/");
            }
        });
    };

    const handleFetchingInterests = async () => {
        setInterests(await api.interests.getInterestsAvailable());
    }

    const handleSettingUpLabels = () => {
        const labels = interests.map(interest => ({ label: interest, value: interest }))
        setInterests(labels)
    }

    if (token) {
        return null;
    }
    return (
      <div className="uk-card uk-card-default uk-card-medium uk-position-center uk-position-medium">
        <form onSubmit={handleSubmit}>
          <fieldset className="uk-fieldset">
            <legend className="legend uk-h1 uk-position-top-center uk-position-medium">
              Sign Up
            </legend>
            <input
              className="uk-input uk-margin-top"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
              placeholder="First Name"
            />
            <input
              className="uk-input uk-margin-top"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
              placeholder="Last Name"
            />
            <input
              className="uk-input uk-margin-top"
              type="text"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email"
            />
            <input
              className="uk-input uk-margin-top"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="username..."
            />
            <input
              className="uk-input uk-margin-top"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="password..."
            />
            <textarea
              className="uk-textarea uk-margin-top"
              value={bio}
              onChange={handleBioChange}
              placeholder="Tell us about yourself (Optional)"
            />
            <textarea
              className="uk-textarea uk-margin"
              value={friendBio}
              onChange={handleFriendBioChange}
              placeholder="What kind of friend(s) are you looking for (Optional)"
            />
            <input className="uk-button uk-button-primary" type="submit" />
          </fieldset>
        </form>
      </div>
    );
};

export default SignUp;