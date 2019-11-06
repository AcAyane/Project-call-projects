import { GET_USER } from "./action_types";
import axios from 'axios';

export const FetchUser = () => dispatch => {
    const payload = axios.get('api/users')
        //.then(res => res.data[0].name)
        .then(res => res.data)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res
            });
        });
}