import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import { api } from "../services/api";
import FriendFinderCard from './FriendFinderCard'
import FriendModal from './FriendModal'

const FriendFinderContainer = props => {
  
  const token = localStorage.getItem("token");
  const [userInterests, setUserInterests] = useState('');
  const [userId, setUserId] = useState('');
  const [friendCards, setFriendCards] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filterSwitch, setFilterSwitch] = useState(false);
  const clicked_user = useSelector(state => state.friends.clicked_user_data);

    useEffect(() => {
        if (token) {
            api.auth.getCurrentUser().then(user => {
              if (user.error) {
                props.history.push("/login");
                localStorage.removeItem('token');
              }
              else {
                setUserId(user.id);
                let filters = []
                filters.push({ filter: "greatest", clicked: "uk-button-primary"})
                filters.push({filter: "least", clicked: "uk-button-default"})
                setSelectedFilter(filters)
                api.getUserData
                  .getCurrentUserData(user.id)
                  .then(user => {
                    let interests = []
                    for (let i = 0; i < user.interest_list.length; i++){
                      if (i === 0) {
                        interests.push({ interest: user.interest_list[i], clicked: "uk-button-primary" })
                      }
                      else {
                        interests.push({ interest: user.interest_list[i], clicked: "uk-button-default" })
                      }
                    }
                    setUserInterests(interests);
                    setSelectedInterests([user.interest_list[0]])
                    handleFirstFetch(user.interest_list[0], user.id)
                  })
              }
            });
        }
        else {
            props.history.push("/login");
        }
    }, [props, token])
  
  const handleFilterSwitch = e => {
    e.persist()
    console.log(e)
    handleFilterSelectToggle(parseInt(e.target.id))
  }
  
  const handleFilterSelectToggle = id => {
    console.log(id)
    if (id === 0) {
      console.log(selectedFilter[id].clicked)
      selectedFilter[0].clicked = "uk-button-primary";
      selectedFilter[1].clicked = "uk-button-default";
      handleFilterForGreatest()
      handleFilterChangeFetch()
    }
    if (id === 1) {
      selectedFilter[1].clicked = "uk-button-primary";
      selectedFilter[0].clicked = "uk-button-default";
      handleFilterForLeast()
      handleFilterChangeFetch()
    }
  }

  const handleFilterChangeFetch = () => {
        if (filterSwitch === false) {
          api.matchedUsers
            .getMatchingUsersFromGreatest(selectedInterests)
            .then(resp => createFriendCards(resp.users));
        } else {
          api.matchedUsers
            .getMatchingUsersFromLeast(selectedInterests)
            .then(resp => createFriendCards(resp.users));
        }
  }

  const handleFilterForGreatest = () => setFilterSwitch(false);
  const handleFilterForLeast = () => setFilterSwitch(true);

  const handleUserFilters = () => {
    let temp = []
    for (let i = 0; i < selectedFilter.length; i++){
      if (i === 0) {
        temp.push(<button className={`uk-button-small ${selectedFilter[i].clicked}`} onClick={handleFilterSwitch} key={selectedFilter[i].filter} id={i}>Most interests to Fewest</button>)
      }
      else {
        temp.push(
          <button
            className={`uk-button-small ${selectedFilter[i].clicked}`}
            onClick={handleFilterSwitch}
            key={selectedFilter[i].filter}
            id={i}
          >
            Fewest Interests to Most
          </button>
        )
      }
    }
    return temp
  }
  
  const handleFirstFetch = (interest, id) => {
    api.matchedUsers.getMatchingUsersFromGreatest(interest)
      .then(resp => {
      createFriendCards(resp.users, id);
    })
  }
  const handleUserInterests = () => {
    let temp = []
    for (let i = 0; i < userInterests.length; i++){
      temp.push(<button className={`uk-button-small ${userInterests[i].clicked}`} onClick={e => handleFetchForFilteredUsers(e)} id={i} key={userInterests[i].interest}>{userInterests[i].interest}</button>)
    }
    return temp
  }

  const handleFetchForFilteredUsers = e => {
    e.persist()
    handleToggleBetweenFilterButtons(e.target.id)
    console.log(selectedInterests)
    if (filterSwitch === false) {
          api.matchedUsers
            .getMatchingUsersFromGreatest(selectedInterests)
            .then(resp => createFriendCards(resp.users));
    }
    else {
          api.matchedUsers
            .getMatchingUsersFromLeast(selectedInterests)
            .then(resp => createFriendCards(resp.users));
    }

  }

  const createFriendCards = (users, id) => {
    let temp = []
    for (let i = 0; i < users.length; i++){
      if (users[i].id !== userId && users[i].id !== id) {
        temp.push(<FriendFinderCard key={users[i].id} user={users[i]} />)
      }
    }
    setFriendCards(temp);
  }

  const handleToggleBetweenFilterButtons = id => {
    if (userInterests[id].clicked === "uk-button-default") {
      userInterests[id].clicked = "uk-button-primary"
      selectedInterests.push(userInterests[id].interest)
      // setSelectedInterests([...selectedInterests, userInterests[id].interest])
    }
    else{
      userInterests[id].clicked = "uk-button-default"
      let index = selectedInterests.indexOf(userInterests[id].interest)
      selectedInterests.splice(index, 1)
    }
  }
  

    if (!token) {
        return null;
    }
    return (
      <div className="uk-container uk-margin">
        <div className="uk-inline">
          <button className="uk-button uk-button-secondary uk-light">
            <span data-uk-icon="settings"></span>
            <span> Filter</span>
          </button>
          <div data-uk-drop="mode: click">
            <div className="uk-card uk-card-body uk-card-default">
              <div className="uk-text-center">
                Filter users that have:
                <div className="">
                  {handleUserFilters()}
                </div>
              </div>
              <hr className="uk-divider-icon"></hr>
              <div className="uk-text-center">
                Choose which interests to filter:
                {handleUserInterests()}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>{friendCards}</div>
          <FriendModal userData={clicked_user} />
        </div>
      </div>
    );

}

export default FriendFinderContainer;