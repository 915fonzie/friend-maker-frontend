import React from 'react'
import { useDispatch } from 'react-redux'
import { CLICKED_USER as ClickedUser } from "../actions/friends";

const FriendFinderCard = props => {

    const dispatch = useDispatch();

    const handleInterestsLabels = () => {
        let temp = []
        for (let i = 0; i < props.user.interest_list.length; i++){
            temp.push(<span className="uk-label uk-margin-right" key={i}>{props.user.interest_list[i]}</span>)   
        }
        return temp
    }

    const handleClickedUser = () => {
        dispatch(ClickedUser(props))
    }

    return (
      <div
        className="uk-margin-top"
        uk-scrollspy="cls: uk-animation-scale-up; delay: 300; repeat: false"
      >
        <div
          className="uk-card uk-card-body uk-card-default"
          data-uk-toggle="target: #modal-center"
          onClick={handleClickedUser}
        >
          <p>{props.user.username}</p>
          <p>Interests:</p>
          <div className="uk-margin">{handleInterestsLabels()}</div>
        </div>
      </div>
    );
}

export default FriendFinderCard;