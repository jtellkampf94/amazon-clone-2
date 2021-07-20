import axios from "axios";
import { Dispatch } from "redux";
import {
  ClearProductErrorsAction,
  GetProductFailureAction,
  GetProductRequestAction,
  GetProductSuccessAction
} from "../actions";

import { ActionTypes } from "../actionTypes";

export const getProduct = (id: string) => async (
  dispatch: Dispatch
): Promise<GetProductSuccessAction | GetProductFailureAction> => {
  try {
    const getProductRequestAction: GetProductRequestAction = {
      type: ActionTypes.GET_PRODUCT_REQUEST
    };
    dispatch(getProductRequestAction);

    const { data } = await axios.get(`/api/v1/product/${id}`);
    const action: GetProductSuccessAction = {
      type: ActionTypes.GET_PRODUCT_SUCCESS,
      payload: data.product
    };

    return dispatch(action);
  } catch (error) {
    const action: GetProductFailureAction = {
      type: ActionTypes.GET_PRODUCT_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const clearProductErrors = () => (
  dispatch: Dispatch
): ClearProductErrorsAction => {
  const action: ClearProductErrorsAction = {
    type: ActionTypes.CLEAR_PRODUCT_ERRORS
  };
  return dispatch(action);
};
