import axios from "axios";
import { Dispatch } from "redux";
import {
  ClearErrorsAction,
  GetAllProductsFailureAction,
  GetAllProductsRequestAction,
  GetAllProductsSuccessAction
} from "../actions";

import { ActionTypes } from "../actionTypes";

export const getProducts = (page: number) => async (
  dispatch: Dispatch
): Promise<GetAllProductsSuccessAction | GetAllProductsFailureAction> => {
  try {
    const getAllProductsRequestAction: GetAllProductsRequestAction = {
      type: ActionTypes.GET_ALL_PRODUCTS_REQUEST
    };
    dispatch(getAllProductsRequestAction);

    const { data } = await axios.get(
      `/api/v1/products?page=${page.toString()}`
    );
    const action: GetAllProductsSuccessAction = {
      type: ActionTypes.GET_ALL_PRODUCTS_SUCCESS,
      payload: data
    };

    return dispatch(action);
  } catch (error) {
    const action: GetAllProductsFailureAction = {
      type: ActionTypes.GET_ALL_PRODUCTS_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const clearErrors = () => (dispatch: Dispatch): ClearErrorsAction => {
  const action: ClearErrorsAction = { type: ActionTypes.CLEAR_ERRORS };
  return dispatch(action);
};
