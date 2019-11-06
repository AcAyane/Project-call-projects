import { combineReducers } from "redux";
import getUserReducer from "../reducers/GetUserReducer";
import authReducer from "../reducers/authReducers";
import errorReducer from "../reducers/errorReducers";
import PostsReducers from "../reducers/PostsReducers"


export default combineReducers({
    getUser: getUserReducer,
    auth: authReducer,
    errors: errorReducer,
    getPosts: PostsReducers
});