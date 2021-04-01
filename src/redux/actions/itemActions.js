import axios from 'axios'
import {toast} from 'react-toastify'
import {
    ITEM_LIST_REQUEST,
    ITEM_LIST_SUCCESS,
    ITEM_LIST_FAILURE
} from '../constants/itemConstants'

export const listItems = () => async (dispatch) => {
    try {
        dispatch({
            type: ITEM_LIST_REQUEST
        })

        const { data } = await axios.get(process.env.REACT_APP_API + '/items')

        dispatch({
            type: ITEM_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        const finalMessage = error.response && error.response.data.message 
                            ? error.response.data.message 
                            : error.message
        dispatch({
            type: ITEM_LIST_FAILURE,
            payload: finalMessage
        })
        toast.error(finalMessage)
    }
}