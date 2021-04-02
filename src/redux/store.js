import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

import { itemDetailsReducer, itemsListReducer } from './reducers/itemReducers'
import { loginReducer, registerReducer } from './reducers/userReducers'
import { cartReducer } from '../redux/reducers/cartReducers'

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo'))
    : null

const preloadedState = {
    cart: { cartItems: cartItemsFromStorage },
    login: { userInfo: userInfoFromStorage },
}

const rootReducer = combineReducers({
    itemsList: itemsListReducer,
    itemDetails: itemDetailsReducer,
    cart: cartReducer,
    login: loginReducer,
    register: registerReducer
})


export default createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
)