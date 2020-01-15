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
        <div id="modal-center" className="uk-flex-top" data-uk-modal>
          <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
            <button
              className="uk-modal-close-default"
              type="button"
              data-uk-close
            ></button>
                    <h1>{props.user.username}</h1>
                    <div>{handleInterestsLabels()}</div>
                    <p>Bio: {props.user.bio}</p>
                    <p>Ideal Friend: {props.user.ideal_friends_bio}</p>
                    <button className="uk-button uk-button-primary">Connect</button>
          </div>
        </div>
      </div>
    );
}

export default FriendFinderCard;