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
                  setUserInterests(user)
                });
              }
            });
        }
        else {
            props.history.push("/login");
        }
    }, [props, token])
  console.log(userInterests)

    if (!token) {
        return null;
    }
    return (
      <div className="uk-container uk-margin">
        <p>THis is a tester</p>
      </div>
    );

}

export default FriendFinderContainer;