import { GET_USER } from "../actions/action_types";

const initialState = {
    username: null,
    errors: {}
}

function GetUserReducer(state = initialState, action) {
    if (action.type === GET_USER) {
        return {
            ...state,
            username: action.payload
        }
    }
    return state;

}

export default GetUserReducer;