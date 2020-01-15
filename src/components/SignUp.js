import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../services/api";
import { SIGN_IN as SignIn } from "../actions/auth";
import MultiSelectDropdown from "./MultiSelectDropdown"
import { interests } from "./Interests"
import './SignUp.css'

const SignUp = props => {
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            api.auth.getCurrentUser().then(user => {
                if (!user.error) {
                    props.history.push("/search-for-friends");
                    return null;
                }
            }); 
        }
    }, [props, token]);
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [bio, setBio] = useState("");
    const [friendBio, setFriendBio] = useState("");
    const [selectedInterests, setSelectedInterests] = useState("");

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
        let interest_list = selectedInterests.join(", ")
      console.log(selectedInterests.length)

      if (selectedInterests.length >= 5) {
                await api.createUser.signup({
                  first_name: firstName,
                  last_name: lastName,
                  email: email,
                  username: username,
                  password: password,
                  bio: bio,
                  ideal_friend_bio: friendBio,
                  interest_list: interest_list
                });

                api.auth.login({ username, password }).then(resp => {
                  if (resp.error) {
                    console.log(resp.error);
                  } else {
                    console.log(resp);
                    dispatch(SignIn(resp));
                    localStorage.setItem("token", resp.jwt);
                    props.history.push("/search-for-friends");
                  }
                });
      }
      else {
return (<div className="uk-alert-danger" data-uk-alert>
  <button className="uk-alert-close" data-uk-close></button>
  <p>
Please Choose at least 5 interests  </p>
</div>)  }

    };

    const handleSelectChange = selectedOption => {
        setSelectedInterests(selectedOption)
    }

    if (token) {
        return null;
    }
    return (
      <div className="uk-container uk-container-large">
        <div className="uk-card uk-card-default uk-card-large">
          <form onSubmit={handleSubmit}>
            <fieldset className="uk-fieldset uk-margin-top uk-margin">
              <legend className="legend uk-h1 uk-text-center">Sign Up</legend>
              <div className="uk-margin">
                <input
                  className="uk-input"
                  type="text"
                  value={firstName}
                  onChange={handleFirstNameChange}
                  placeholder="First Name"
                />
              </div>
              <div className="uk-margin">
                <input
                  className="uk-input"
                  type="text"
                  value={lastName}
                  onChange={handleLastNameChange}
                  placeholder="Last Name"
                />
              </div>
              <div className="uk-margin">
                <input
                  className="uk-input"
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email"
                />
              </div>
              <div className="uk-margin">
                <input
                  className="uk-input"
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="username..."
                />
              </div>
              <div className="uk-margin">
                <input
                  className="uk-input"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="password..."
                />
              </div>
              <div className="uk-margin">
                <textarea
                  className="uk-textarea"
                  value={bio}
                  onChange={handleBioChange}
                  placeholder="Tell us about yourself (Optional)"
                />
              </div>
              <div className="uk-margin">
                <textarea
                  className="uk-textarea"
                  value={friendBio}
                  onChange={handleFriendBioChange}
                  placeholder="What kind of friend(s) are you looking for (Optional)"
                />
              </div>
              <div className="uk-margin">
                <MultiSelectDropdown
                  options={interests}
                                onSelectOptions={handleSelectChange}
                                checked={[]}
                />
                <p>*Must choose at least 5 interests</p>
              </div>
              <div className="uk-margin">
                <input className="uk-button uk-button-primary" type="submit" />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
};

export default SignUp;