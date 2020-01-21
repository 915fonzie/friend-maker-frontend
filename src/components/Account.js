import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { api } from "../services/api";
import MultiSelectDropdown from "./MultiSelectDropdown";
import { interests } from "./Interests";
import "./SignUp.css";

const Account = props => {
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (token) {
        api.auth.getCurrentUser().then(user => {
          if (user.error) {
            props.history.push("/");
            localStorage.removeItem('token');
          }
          else {
              api.getUserData
                .getCurrentUserData(user.id)
                .then(user => {
                  console.log(user);
                  setUserId(user.id);
                  setUsername(user.username);
                  setFirstName(user.first_name);
                  setLastName(user.last_name);
                  setEmail(user.email);
                  setBio(user.bio);
                  setFriendBio(user.ideal_friend_bio);
                  setSelectedInterests(user.interest_list);
                })
            }
        });
      } else {
        props.history.push("/");
      }
    }, [props, token]);

    const [userId, setUserId] = useState('');
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
      setBio(e.target.value);
    };

    const handleFriendBioChange = e => {
      setFriendBio(e.target.value);
    };

    console.log(selectedInterests);

    const handleSubmit = async e => {
      e.preventDefault();
      let interest_list = selectedInterests.join(", ");
      console.log(interest_list);
      await api.updateUser.updateUserAccount({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
        bio: bio,
        ideal_friend_bio: friendBio,
        interest_list: interest_list
      });
    };

    const handleSelectChange = selectedOption => {
      setSelectedInterests(selectedOption);
    };

    if (!token) {
      return null;
    }
    return (
      <div className="uk-container uk-container-large">
        <div className="uk-card uk-card-default uk-card-large">
          <form onSubmit={handleSubmit}>
            <fieldset className="uk-fieldset uk-margin-top uk-margin">
              <legend className="legend uk-h1 uk-text-center">Account</legend>
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
                                checked={selectedInterests}
                />
              </div>
              <div className="uk-margin">
                <input className="uk-button uk-button-primary" type="submit" />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    );
}

export default Account;