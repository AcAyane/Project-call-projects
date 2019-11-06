import axios from "axios";
import {
    SET_POST,
    GET_POSTS,
    GET_POSTSA,
    GET_CV,
    GET_ERRORS
} from "./action_types";

export const addPost = (Post) => dispatch => {
    axios
        .post("/api/posts", Post)
        .then(console.log(Post))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const approvePost = (name) => dispatch => {
    axios
        .post("/api/posts/approvePost", name)
        .then(console.log(name))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const approveCV = (name) => dispatch => {
    axios
        .post("/api/posts/approveCV", name)
        .then(console.log(name))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const addCV = (Post) => dispatch => {
    axios
        .post("/api/posts/CV", Post)
        .then(console.log(Post))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
export const getPosts = () => dispatch => {
    const payload = axios.get('api/posts')
        //.then(res => res.data[0].name)
        .then(res => res.data)
        .then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res
            });
        })
};
export const getPostsA = () => dispatch => {
    const payload = axios.get('api/posts/A')
        //.then(res => res.data[0].name)
        .then(res => res.data)
        .then(res => {
            dispatch({
                type: GET_POSTSA,
                payload: res
            });
        })
};
export const getCV = () => dispatch => {
    const payload = axios.get('api/posts/CV')
        //.then(res => res.data[0].name)
        .then(res => res.data)
        .then(res => {
            dispatch({
                type: GET_CV,
                payload: res
            });
        })
};