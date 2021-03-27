import axios from 'axios'
import {
    USER_REGISTER_FAILURE,
    USER_REGISTER_SUCCESS
} from "../constants/userConstants"

import { toast } from 'react-toastify';

export const login = (email, password) => async (dispatch) => {
    
}

export const register = (username, email, password) => async (dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const { data } = await axios.post(
            `${process.env.REACT_APP_API}/register`,
            {
                username,
                email,
                password,
            },
            config
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        toast.success('User signed up successfully ')

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        const { response: { data } } = error

        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: data
        })
        toast.error(data)

    }
}