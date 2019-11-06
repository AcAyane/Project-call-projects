import { GET_POSTS, GET_POSTSA, GET_CV } from "../actions/action_types";

const initialState = {
    posts: [],
    postsA: [],
    CV: [],
    name: null,
    descr: null,
    date: null,
    errors: {}
}

function GetUserReducer(state = initialState, action) {
    if (action.type === GET_POSTS) {
        return {
            ...state,
            posts: action.payload

        }
    }
    else if (action.type === GET_POSTSA) {
        return {
            ...state,
            postsA: action.payload

        }
    }
    else if (action.type === GET_CV) {
        return {
            ...state,
            CV: action.payload
        }
    }
    return state;

}

export default GetUserReducer;