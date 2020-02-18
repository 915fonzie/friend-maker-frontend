import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import MultiSelectDropDown from './MultiSelectDropdown'
import { interests } from './Interests'
import { avatars }  from './Avatars'
import { motion } from 'framer-motion'
import "./SignUp.css";

const Account = props => {
  const token = localStorage.getItem("token");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [friendBio, setFriendBio] = useState("");
  const [avatar, setAvatar] = useState({avatarUrl: ""})

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
                  setSelectedInterests(user.interest_list);
                  setUserId(user.id);
                  setUsername(user.username);
                  setFirstName(user.first_name);
                  setLastName(user.last_name);
                  setEmail(user.email);
                  setBio(user.bio);
                  setFriendBio(user.ideal_friend_bio);
                  setAvatar({avatarUrl: user.avatar_url})
                })
            }
        });
      } else {
        props.history.push("/");
      }
    }, [props, token]);


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
  
    const handleSelectChange = selectedOption => {
        setSelectedInterests(selectedOption);
    };
  
    const returnAvatar = () => {
      if (avatar.avatarUrl !== "") {
        return (
          <img
            className="uk-inline uk-card uk-card-default uk-margin-bottom"
            src={avatar.avatarUrl}
            style={{ maxWidth: "15vh" }}
          ></img>
        );
      }
      return null;
    };

    const handleAddingAvatar = (data, condition) => {
      if (condition) {
        setAvatar({ avatarUrl: data });
      } else {
        setAvatar({ avatarUrl: "" });
      }
    };

    const handleSelectAvatar = e => {
      e.persist();
      handleAddingAvatar(e.target.src, true);
    };

    const handleShowingAvatars = () => {
      let allAvatars = [];
      for (let i = 0; i < avatars.length; i++) {
        allAvatars.push(
          <motion.img
            className="uk-card uk-card-default uk-margin-left uk-margin-bottom"
            src={avatars[i].url}
            key={i}
            style={{ maxWidth: "10vh" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSelectAvatar}
          ></motion.img>
        );
      }
      return allAvatars;
    };


    const handleSubmit = async e => {
      e.preventDefault();
      let interest_list = selectedInterests.join(", ");
      await api.updateUser.updateUserAccount({
        id: userId,
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
        bio: bio,
        ideal_friend_bio: friendBio,
        avatar_url: avatar.avatarUrl,
        interest_list: interest_list
      });
      props.history.push('/search-for-friends')
    };



    if (!token) {
      return null;
    }
    return (
      <div className="uk-container">
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
                <MultiSelectDropDown
                  options={interests}
                  onSelectOptions={handleSelectChange}
                  checked={selectedInterests}
                />
              </div>
              <div>
                <div>{returnAvatar()}</div>
                <button className="uk-button uk-button-default" type="button">
                  Choose Avatar
                </button>
                <div
                  className="uk-width-large"
                  data-uk-drop="mode: hover; pos: top-right"
                >
                  <div
                    className="uk-card uk-card-body uk-card-default"
                  >
                    {handleShowingAvatars()}
                  </div>
                </div>
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