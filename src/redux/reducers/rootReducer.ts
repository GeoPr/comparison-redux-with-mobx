import { userReducer } from './userReducer/userReducer';
import { combineReducers } from 'redux';
import { postsReducer } from './postsReducer/postsReducer'

export const rootReducer = combineReducers({
	posts: postsReducer,
	user: userReducer
})
