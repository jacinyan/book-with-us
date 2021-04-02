import {
    ITEMS_LIST_REQUEST,
    ITEMS_LIST_SUCCESS,
    ITEMS_LIST_FAILURE,
    ITEM_DETAILS_REQUEST,
    ITEM_DETAILS_SUCCESS,
    ITEM_DETAILS_FAILURE
} from '../constants/itemConstants'

export const itemsListReducer = (state = { items: [] }, action) => {
    switch (action.type) {
        case ITEMS_LIST_REQUEST:
            return { loading: true, items: [] }
        case ITEMS_LIST_SUCCESS:
            return { loading: false, items: action.payload }
        case ITEMS_LIST_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const itemDetailsReducer = (state = { item: { reviews: [] } }, action) => {
    switch (action.type) {
        case ITEM_DETAILS_REQUEST:
            return { loading: true, ...state }
        case ITEM_DETAILS_SUCCESS:
            return { loading: false, item: action.payload }
        case ITEM_DETAILS_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}