import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SIGN_OUT as SignOut } from "../actions/auth";


const NavBar = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token')
    const handleLogout = () => {
        dispatch(SignOut())
        localStorage.removeItem('token')
    }
    const handleLoggedInLoggedOut = () => {
        if (token) {
            return (
              <span
                onClick={handleLogout}
                data-uk-toggle="target: #offcanvas-slide"
              >
                Sign Out
              </span>
            );
        }
        else {
            return (
              <span
                data-uk-toggle="target: #offcanvas-slide"
              >
                Login
              </span>
            );
        }
    }
  
  const handleAccountVisibility = () => {
    if (token) {
      return (
        <li className="uk-parent">
          <Link to="/account">
            <span
              className="uk-margin-small-right"
              data-uk-icon="user"
              data-uk-toggle="target: #offcanvas-slide"
            ></span>
            <span data-uk-toggle="target: #offcanvas-slide">Account</span>
          </Link>
        </li>
      );
    }
  }

  const handleSearchFriendsVisibility = () => {
    if (token) {
      return (
        <li>
          <Link to="/search-for-friends">
            <span
              className="uk-margin-small-right"
              data-uk-icon="search"
              data-uk-toggle="target: #offcanvas-slide"
            ></span>
            <span data-uk-toggle="target: #offcanvas-slide">Find Friends</span>
          </Link>
        </li>
      );
    }
  }

  const handleHomeVisibility = () => {
    if (!token) {
      return (
        <li className="uk-parent">
          <Link to="/">
            <span
              className="uk-margin-small-right"
              data-uk-icon="home"
              data-uk-toggle="target: #offcanvas-slide"
            ></span>
            <span data-uk-toggle="target: #offcanvas-slide">Home</span>
          </Link>
        </li>
      );
    }
  }

    return (
      <div className="uk-margin-small-top uk-flex" data-uk-sticky>
        <button className="uk-button uk-button-secondary uk-light" data-uk-toggle="target: #offcanvas-slide">
          <span data-uk-navbar-toggle-icon></span>
          <span className="uk-margin-small-left">Menu</span>
        </button>
        <div
          className="uk-offcanvas"
          id="offcanvas-slide"
          data-uk-offcanvas="overlay: true;"
        >
          <div className="uk-offcanvas-bar uk-offcanvas uk-flex uk-flex-column">
            <button className="uk-offcanvas-close" data-uk-close></button>
            <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
              <li className="uk-nav-header">Menu</li>
              <li className="uk-nav-divider"></li>
              {handleHomeVisibility()}
              {handleSearchFriendsVisibility()}
              <ul className="uk-nav-sub">
                {handleAccountVisibility()}
                <li className="uk-parent">
                  <Link to="/login">
                    <span
                      className="uk-margin-small-right"
                      data-uk-icon="sign-out"
                      data-uk-toggle="target: #offcanvas-slide"
                    ></span>
                    {handleLoggedInLoggedOut()}
                  </Link>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default NavBar;