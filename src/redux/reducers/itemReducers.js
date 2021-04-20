import {
  ITEMS_LIST_REQUEST,
  ITEMS_LIST_SUCCESS,
  ITEMS_LIST_FAILURE,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAILURE,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_DELETE_FAILURE,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_FAILURE,
  ITEM_CREATE_RESET,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAILURE,
  ITEM_UPDATE_RESET,
  ITEM_CREATE_REVIEW_REQUEST,
  ITEM_CREATE_REVIEW_SUCCESS,
  ITEM_CREATE_REVIEW_FAILURE,
  ITEM_CREATE_REVIEW_RESET,
  ITEMS_TOP_REQUEST,
  ITEMS_TOP_SUCCESS,
  ITEMS_TOP_FAILURE,
} from "../constants/itemConstants";

export const itemsListReducer = (state = { items: [] }, action) => {
  switch (action.type) {
    case ITEMS_LIST_REQUEST:
      return { loading: true, items: [] };
    case ITEMS_LIST_SUCCESS:
      return {
        loading: false,
        items: action.payload.items,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ITEMS_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemDetailsReducer = (
  state = { item: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case ITEM_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ITEM_DETAILS_SUCCESS:
      return { loading: false, item: action.payload };
    case ITEM_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_DELETE_REQUEST:
      return { loading: true };
    case ITEM_DELETE_SUCCESS:
      return { loading: false, success: true };
    case ITEM_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const itemCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_CREATE_REQUEST:
      return { loading: true };
    case ITEM_CREATE_SUCCESS:
      return { loading: false, success: true, item: action.payload };
    case ITEM_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    case ITEM_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const itemUpdateReducer = (state = { item: {} }, action) => {
  switch (action.type) {
    case ITEM_UPDATE_REQUEST:
      return { loading: true };
    case ITEM_UPDATE_SUCCESS:
      return { loading: false, success: true, item: action.payload };
    case ITEM_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    case ITEM_UPDATE_RESET:
      return { item: {} };
    default:
      return state;
  }
};

export const itemReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ITEM_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case ITEM_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case ITEM_CREATE_REVIEW_FAILURE:
      return { loading: false, error: action.payload };
    case ITEM_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const itemsTopRatedReducer = (state = {items:[]}, action) => {
  switch (action.type) {
    case ITEMS_TOP_REQUEST:
      return { loading: true, items: [] };
    case ITEMS_TOP_SUCCESS:
      return { loading: false, items: action.payload };
    case ITEMS_TOP_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
