import React, { useState, useEffect } from "react";
import { api } from "../services/api";
const FriendFinderContainer = props => {
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            props.history.push("/login");
        }
    }, [props, token])

    return (
        <div>Friend Finder</div>
    );

}

export default FriendFinderContainer;