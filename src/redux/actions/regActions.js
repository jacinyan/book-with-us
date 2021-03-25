import axios from 'axios'

import { USER_REGISTER_FAILURE, USER_REGISTER_SUCCESS } from "../constants/regConstants"

export const register = (username, email, password, confirmPassword) => async (dispatch) => {
    try {
        const { response: data } = await axios.post(
            'http://localhost:3000/api/register',
            {
                username,
                email,
                password,
                confirmPassword
            }
        )

        console.log(data);

        dispatch(
            {
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type:USER_REGISTER_FAILURE,
            payload: error
        })
    }
}