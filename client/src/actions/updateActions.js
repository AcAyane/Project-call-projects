import axios from "axios";
import {
    UPDATE_USER,
    GET_ERRORS
} from "./action_types";

export const Updateuser = (UpdateUser) => dispatch => {
    axios
        .post("/api/users/update", UpdateUser)
        .then(console.log(UpdateUser))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};