import React, { useState ,useEffect } from "react";
import { api } from "../services/api";
import FriendFinderCard from './FriendFinderCard'

const FriendFinderContainer = props => {
  
  const token = localStorage.getItem("token");
  const [userInterests, setUserInterests] = useState('');
  const [userId, setUserId] = useState('');
  const [friendCards, setFriendCards] = useState('');

    useEffect(() => {
        if (token) {
            api.auth.getCurrentUser().then(user => {
              if (user.error) {
                console.log("it's not an async problem")
                props.history.push("/login");
              }
              else {
                setUserId(user.id);
                api.getUserData
                  .getCurrentUserData(user.id)
                  .then(user => {
                    setUserInterests(user.interest_list);
                  })
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
      temp.push(<button onClick={e => handleFetchForFilteredUsers(e)} key={userInterests[i]}>{userInterests[i]}</button>)
    }
    return temp
  }

  const handleFetchForFilteredUsers = (e) => {
    e.persist()
    console.log(e.target.innerText)
    api.matchedUsers.getMatchingUsersFromGreatest(e.target.innerText)
    .then(resp => createFriendCards(resp.users));
  }

  const createFriendCards = users => {
    let temp = []
    for (let i = 0; i < users.length; i++){
      if (users[i].id !== userId) {
        temp.push(<FriendFinderCard key={users[i].id} user={users[i]}/>)
      }
    }
    setFriendCards(temp);
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
        <div>
          {friendCards}
        </div>
      </div>
    );

}

export default FriendFinderContainer;