import {
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_SUCCESS
} from '../constants/userConstants'

const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                userInfo: action.payload
            }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }
}

const registerReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                userInfo: action.payload
            }
        default:
            return state
    }
}


export {
    loginReducer,
    registerReducer
}

