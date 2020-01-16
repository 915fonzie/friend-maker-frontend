import React from 'react'

const FriendModal = props => {

    const { interest_list, username, bio, ideal_friend_bio } = props.userData.user

        const handleInterestsLabels = () => {
          let allInterests = [];
          for (let i = 0; i < interest_list.length; i++) {
            allInterests.push(
              <span className="uk-label uk-margin-right" key={i}>
                {interest_list[i]}
              </span>
            );
          }
          return allInterests;
        };
    if (!props) {
        return null;
    }

    return (
      <div id="modal-center" className="uk-flex-top" data-uk-modal>
        <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical">
          <button
            className="uk-modal-close-default"
            type="button"
            data-uk-close
          ></button>
          <h1>{username}</h1>
          <div>{handleInterestsLabels()}</div>
          <p>Bio: {bio}</p>
          <p>Ideal Friend: {ideal_friend_bio}</p>
          <button className="uk-button uk-button-primary">Connect</button>
        </div>
      </div>
    );
}

export default FriendModal;
