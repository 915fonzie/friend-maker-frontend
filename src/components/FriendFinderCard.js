import React from 'react'
import { useDispatch } from 'react-redux'
import { CLICKED_USER as ClickedUser } from "../actions/friends";
import { motion } from 'framer-motion'

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
        <motion.div
          className="uk-card uk-card-body uk-card-default"
          data-uk-toggle="target: #modal-center"
          onClick={handleClickedUser}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
        >
          <p>{props.user.username}</p>
          <p>Interests:</p>
          <div className="uk-margin">{handleInterestsLabels()}</div>
        </motion.div>
      </div>
    );
}

export default FriendFinderCard;