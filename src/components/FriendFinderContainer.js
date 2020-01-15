import React, { useState ,useEffect } from "react";
import { api } from "../services/api";

const FriendFinderContainer = props => {
  
  const token = localStorage.getItem("token");
  const [userInterests, setUserInterests] = useState('');

    useEffect(() => {
        if (token) {
            api.auth.getCurrentUser().then(user => {
              if (user.error) {
                console.log("it's not an async problem")
                props.history.push("/login");
              }
              else {
                api.getUserData.getCurrentUserData(user.id).then(user => {
                  setUserInterests(user.interest_list)
                });
              }
            });
        }
        else {
            props.history.push("/login");
        }
    }, [props, token])
  console.log(userInterests)
  const handleUserInterests = () => {
    let temp = []
    for (let i = 0; i < userInterests.length; i++){
      temp.push(<button key={userInterests[i]}>{userInterests[i]}</button>)
    }
    return temp
  }
  

    if (!token) {
        return null;
    }
    return (
      <div className="uk-container uk-margin">
        <div className="uk-inline">
          <button className="uk-button uk-button-default">Filter</button>
          <div data-uk-drop="mode: click">
            <div className="uk-card uk-card-body uk-card-default">
                {handleUserInterests()}
            </div>
          </div>
        </div>
      </div>
    );

}

export default FriendFinderContainer;