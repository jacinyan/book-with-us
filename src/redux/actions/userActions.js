import axios from 'axios'
import {
    USER_REGISTER_FAILURE,
    USER_REGISTER_SUCCESS,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAILURE,
    USER_LOGOUT
} from "../constants/userConstants"

import { toast } from 'react-toastify';

export const login = (email, password) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const { data } = await axios.post(
            `${process.env.REACT_APP_API}/login`,
            {
                email,
                password,
            },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

        toast.success('Logged in successfully ')
    } catch (error) {
        // console.log(error.response.data.message);
        const { response: { data: { message } } } = error

        dispatch({
            type: USER_LOGIN_FAILURE,
            payload: message
        })
        toast.error(message)
    }

}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/login'
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

        localStorage.setItem('userInfo', JSON.stringify(data))

        toast.success('Signed up successfully ')
    } catch (error) {
        
        const finalMessage = error.response && error.response.data.message 
                            ? error.response.data.message 
                            : error.message
        dispatch({
            type: USER_REGISTER_FAILURE,
            payload: finalMessage
        })
        toast.error(finalMessage)
    }
}