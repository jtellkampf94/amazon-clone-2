import { ActionTypes } from "../actionTypes";
import { Order } from "../reducers/orderReducer";

export interface CreateOrderRequestAction {
  type: ActionTypes.CREATE_ORDER_REQUEST;
}

export interface CreateOrderSuccessAction {
  type: ActionTypes.CREATE_ORDER_SUCCESS;
  payload: Order;
}

export interface CreateOrderFailureAction {
  type: ActionTypes.CREATE_ORDER_FAILURE;
  payload: string;
}

export interface ClearOrderErrorsAction {
  type: ActionTypes.CLEAR_ORDER_ERRORS;
}

export type OrderAction =
  | CreateOrderRequestAction
  | CreateOrderSuccessAction
  | CreateOrderFailureAction
  | ClearOrderErrorsAction;
