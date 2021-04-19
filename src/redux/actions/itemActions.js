import axios from "axios";
import {
  ITEMS_LIST_REQUEST,
  ITEMS_LIST_SUCCESS,
  ITEMS_LIST_FAILURE,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAILURE,
  ITEM_DELETE_FAILURE,
  ITEM_DELETE_REQUEST,
  ITEM_DELETE_SUCCESS,
  ITEM_CREATE_REQUEST,
  ITEM_CREATE_SUCCESS,
  ITEM_CREATE_FAILURE,
  ITEM_UPDATE_REQUEST,
  ITEM_UPDATE_SUCCESS,
  ITEM_UPDATE_FAILURE,
  ITEM_CREATE_REVIEW_REQUEST,
  ITEM_CREATE_REVIEW_SUCCESS,
  ITEM_CREATE_REVIEW_FAILURE,
} from "../constants/itemConstants";
import { logout } from "./userActions";
import { toast } from "react-toastify";

export const listItems = (keyword = "") => async (dispatch) => {
  try {
    dispatch({
      type: ITEMS_LIST_REQUEST,
    });

    const { data } = await axios.get(
      process.env.REACT_APP_API + `/items?keyword=${keyword}`
    );

    dispatch({
      type: ITEMS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ITEMS_LIST_FAILURE,
      payload: finalMessage,
    });
  }
};

export const listItemDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ITEM_DETAILS_REQUEST,
    });

    const { data } = await axios.get(
      process.env.REACT_APP_API + `/items/${id}`
    );

    dispatch({
      type: ITEM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ITEM_DETAILS_FAILURE,
      payload: finalMessage,
    });
  }
};

export const deleteItem = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(process.env.REACT_APP_API + `/items/${id}`, config);
    dispatch({
      type: ITEM_DELETE_SUCCESS,
    });
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (finalMessage === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ITEM_DELETE_FAILURE,
      payload: finalMessage,
    });
    toast.error(finalMessage, { autoClose: false });
  }
};

export const createItem = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      process.env.REACT_APP_API + `/items`,
      {},
      config
    );
    dispatch({
      type: ITEM_CREATE_SUCCESS,
      payload: data,
    });

    toast.success("Item created");
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (finalMessage === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ITEM_CREATE_FAILURE,
      payload: finalMessage,
    });
    toast.error(finalMessage, { autoClose: false });
  }
};

export const updateItem = (item) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      process.env.REACT_APP_API + `/items/${item._id}`,
      item,
      config
    );
    // console.log('before Item UPDATE success');
    dispatch({
      type: ITEM_UPDATE_SUCCESS,
      payload: data,
    });
    // console.log('after Item UPDATE success');
    toast.success("Item updated");
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (finalMessage === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ITEM_UPDATE_FAILURE,
      payload: finalMessage,
    });
    toast.error(finalMessage, { autoClose: false });
  }
};

export const createItemReview = (itemId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ITEM_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(
      process.env.REACT_APP_API + `/items/${itemId}/reviews`,
      review,
      config
    );
    dispatch({
      type: ITEM_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    const finalMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (finalMessage === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ITEM_CREATE_REVIEW_FAILURE,
      payload: finalMessage,
    });
    toast.error(finalMessage, { autoClose: false });
  }
};
