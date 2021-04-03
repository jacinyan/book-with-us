import axios from "axios";
import {
  ITEMS_LIST_REQUEST,
  ITEMS_LIST_SUCCESS,
  ITEMS_LIST_FAILURE,
  ITEM_DETAILS_REQUEST,
  ITEM_DETAILS_SUCCESS,
  ITEM_DETAILS_FAILURE,
} from "../constants/itemConstants";

export const listItems = () => async (dispatch) => {
  try {
    dispatch({
      type: ITEMS_LIST_REQUEST,
    });

    const { data } = await axios.get(process.env.REACT_APP_API + "/items");

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
