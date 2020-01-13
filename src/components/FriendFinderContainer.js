import React, { useState, useEffect } from "react";
import { api } from "../services/api";

const FriendFinderContainer = props => {
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            api.auth.getCurrentUser().then(user => {
              if (user.error) {
                props.history.push("/login");
              }
            });
        }
        else {
            props.history.push("/login");
        }
    }, [props, token])

    return (
      <div className="uk-margin uk-margin-left">
            <div className="uk-card uk-card-default uk-card-medium uk-position-center uk-position-medium">
                <p>this is a tester</p>
            </div>
      </div>
    );

}

export default FriendFinderContainer;