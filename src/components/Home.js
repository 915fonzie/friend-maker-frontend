import React from 'react'

const Home = props => {
    return (
      <div className="uk-margin uk-padding">
        <div
          className="uk-card uk-card-large uk-card-body uk-card-default uk-position-center"
          style={{
            backgroundImage: "url(https://i.imgur.com/ZCBI4nj.jpg)",
            backgroundSize: "100vh",
            minHeight: "68vh",
            width: "100vh",
            minWidth: "50vh"
          }}
        >
          <h3 className="uk-card-title uk-text-center uk-padding">
            Welcome to Friend Connect
          </h3>
          <div className="uk-flex uk-position-bottom-center uk-margin-bottom">
            <button className="uk-button uk-button-primary uk-margin-right">
              Login
            </button>
                    <button className="uk-button uk-margin-left">Sign Up</button>
          </div>
        </div>
      </div>
    );
}

export default Home;