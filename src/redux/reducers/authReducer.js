import { USER_LOGIN_SUCCESS,USER_LOGOUT } from '../constants/authConstants'

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case USER_LOGOUT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}


export {
    authReducer
}
