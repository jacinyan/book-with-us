import { USER_REGISTER_SUCCESS } from '../constants/regConstants'

const regReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_SUCCESS:
                return {
                    ...state,
                    ...action.payload
                }
        default:
            return state
    }
}


export {
    regReducer
}
