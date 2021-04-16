import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import {
  itemCreateReducer,
  itemDeleteReducer,
  itemDetailsReducer,
  itemsListReducer,
  itemUpdateReducer,
} from "./reducers/itemReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  usersListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import { cartReducer } from "../redux/reducers/cartReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  ordersListMyReducer,
  ordersListReducer,
  orderPayReducer,
  orderDeliverReducer
} from "../redux/reducers/orderReducers";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const preloadedState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const rootReducer = combineReducers({
  itemsList: itemsListReducer,
  itemDetails: itemDetailsReducer,
  itemCreate: itemCreateReducer,
  itemUpdate: itemUpdateReducer,
  itemDelete: itemDeleteReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  usersList: usersListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  ordersListMy: ordersListMyReducer,
  ordersList: ordersListReducer,
  orderDeliver: orderDeliverReducer
});

export default createStore(
  rootReducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk))
);
