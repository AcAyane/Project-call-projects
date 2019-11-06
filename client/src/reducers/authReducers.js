import {
    SET_CURRENT_USER,
    SET_NAVBAR,
    SET_ADMIN,
    USER_LOADING
} from "../actions/action_types";
const isEmpty = require("is-empty");
const initialState = {
    isAuthenticated: false,
    user: {},
    name: "",
    admin: false,
    loading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        case SET_NAVBAR:
            return {
                ...state,
                name: action.payload
            };
        case SET_ADMIN:
            return {
                ...state,
                admin: true
            };

        default:
            return state;
    }
}