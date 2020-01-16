import auth from './auth'
import friends from './friends'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    auth,
    friends,

})

export default rootReducer;