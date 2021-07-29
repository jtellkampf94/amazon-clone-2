import axios from "axios";
import { Dispatch } from "redux";
import {
  CreateOrderRequestAction,
  CreateOrderSuccessAction,
  CreateOrderFailureAction,
  ClearOrderErrorsAction
} from "../actions";

import { ActionTypes } from "../actionTypes";
import { Order } from "../reducers/orderReducer";

export const createOrder = (order: Order) => async (
  dispatch: Dispatch
): Promise<CreateOrderSuccessAction | CreateOrderFailureAction> => {
  try {
    const createOrderRequestAction: CreateOrderRequestAction = {
      type: ActionTypes.CREATE_ORDER_REQUEST
    };
    dispatch(createOrderRequestAction);

    const { data } = await axios.post(`/api/v1/order/new`, order, {
      headers: { "Content-Type": "application/json" }
    });
    const action: CreateOrderSuccessAction = {
      type: ActionTypes.CREATE_ORDER_SUCCESS,
      payload: data.order
    };

    return dispatch(action);
  } catch (error) {
    const action: CreateOrderFailureAction = {
      type: ActionTypes.CREATE_ORDER_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const clearOrderErrors = () => (
  dispatch: Dispatch
): ClearOrderErrorsAction => {
  const action: ClearOrderErrorsAction = {
    type: ActionTypes.CLEAR_ORDER_ERRORS
  };
  return dispatch(action);
};
