import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM
} from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(prevItem => prevItem.item === item.item)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(prevItem => prevItem.item === existItem.item ? item : prevItem)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: [...state.cartItems.filter(prevItem=>prevItem.item !==action.payload)]
            }
        default:
            return state
    }
}

