import React from 'react'

const Home = props => {

    const token = localStorage.getItem('token');

    if (token) {
        props.history.push('/search-for-friends');
        return null;
    }

    return (
      <div className="uk-margin uk-padding">
        <div
          className="uk-card uk-card-large uk-card-body uk-card-default uk-position-center"
          style={{
            backgroundImage: "url(https://i.imgur.com/ZCBI4nj.jpg)",
            backgroundSize: "100vh",
            maxHeight: "68vh",
            width: "100vh",
            maxWidth: "100vh"
          }}
        >
          <h3 className="uk-card-title uk-text-center">
            <img className="uk-img uk-pos" src="https://i.imgur.com/V2RM3Xq.png"></img>
          </h3>
          <div className="uk-flex uk-position-bottom-center uk-margin-bottom">
            <button className="uk-button uk-button-third uk-margin-right uk-light" onClick={() => props.history.push('/login')}>
              Login
            </button>
            <button className="uk-button uk-button-third uk-margin-left uk-light" onClick={() => props.history.push('/signup')}>Sign Up</button>
          </div>
        </div>
      </div>
    );
}

export default Home;