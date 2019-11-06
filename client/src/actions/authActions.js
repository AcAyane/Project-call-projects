import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
    GET_ERRORS,
    SET_CURRENT_USER,
    SET_NAVBAR,
    SET_ADMIN,
    USER_LOADING
} from "./action_types";
// Register User
export const registerUserP = (userData, history) => dispatch => {
    axios
        .post("/api/users/registerP", userData)
        .then(console.log(userData))
        .then(res => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const setAdmin = () => dispatch => {
    dispatch({
        type: SET_ADMIN
    })
};
export const registerUserI = (userData, history) => dispatch => {
    axios
        .post("/api/users/registerI", userData)
        .then(console.log(userData))
        .then(res => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const registerUserCV = (userData, history) => dispatch => {
    axios
        .post("/api/users/registerCV", userData)
        .then(console.log(userData))
        .then(res => history.push("/login")) // re-direct to login on successful register
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const loginUser = (userData, history) => dispatch => {
    axios
        .post("/api/users/login", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
            return res;
        })
        .then(res => {
            const { name } = res.data;
            dispatch(setNavbar(name));
        })
        .then(res => history.push("/HomePage"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Login - get user token
export const loginUserP = (userData, history) => dispatch => {
    axios
        .post("/api/users/loginP", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
            return res;
        })
        .then(res => {
            const { name } = res.data;
            dispatch(setNavbar(name));
        })
        .then(res => history.push("/HomePage"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const loginUserI = (userData, history) => dispatch => {
    axios
        .post("/api/users/loginI", userData)
        .then(res => {
            // Save to localStorage
            // Set token to localStorage
            const { token } = res.data;
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
            return res;
        })
        .then(res => {
            const { name } = res.data;
            dispatch(setNavbar(name));
        })
        .then(res => history.push("/HomePage"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};

export const setNavbar = name => {
    return ({
        type: SET_NAVBAR,
        payload: name
    });
};
export const getUser = () => {
    axios.get("/api/users").then(res => console.log(res.data));
};