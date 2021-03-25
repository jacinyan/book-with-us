import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { authReducer } from '../redux/reducers/authReducer'
import { regReducer } from './reducers/regReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    reg: regReducer
})


export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))