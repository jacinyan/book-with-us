import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { authReducer, regReducer } from '../redux/reducers/userReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    reg: regReducer
})


export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))