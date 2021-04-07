import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const currItem = action.payload;
      // .item refers to the id of a certain book
      const existItem = state.cartItems.find(
        (prevItem) => prevItem.item === currItem.item
      );

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((prevItem) =>
            prevItem.item === existItem.item ? currItem : prevItem
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, currItem],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter(
            (prevItem) => prevItem.item !== action.payload
          ),
        ],
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
