import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { loginReducer, registerReducer } from './reducers/userReducers'

const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer
})


export default createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))