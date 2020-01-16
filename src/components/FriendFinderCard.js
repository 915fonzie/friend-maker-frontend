import React from 'react'

const FriendFinderCard = props => {

    const handleInterestsLabels = () => {
        let temp = []
        for (let i = 0; i < props.user.interest_list.length; i++){
            temp.push(<span className="uk-label uk-margin-right" key={i}>{props.user.interest_list[i]}</span>)   
        }
        return temp
    }

    return (
      <div className="uk-margin-top">
        <div className="uk-card uk-card-body uk-card-default" data-uk-toggle="target: #modal-center">
          <p>{props.user.username}</p>
          <p>Interests:</p>
          <div className="uk-margin">{handleInterestsLabels()}</div>
        </div>
      </div>
    );
}

export default FriendFinderCard;