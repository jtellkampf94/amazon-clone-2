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

export interface MyOrdersRequestAction {
  type: ActionTypes.MY_ORDERS_REQUEST;
}

export interface MyOrdersSuccessAction {
  type: ActionTypes.MY_ORDERS_SUCCESS;
  payload: Order[];
}

export interface MyOrdersFailureAction {
  type: ActionTypes.MY_ORDERS_FAILURE;
  payload: string;
}

export interface GetOrderRequestAction {
  type: ActionTypes.GET_ORDER_REQUEST;
}

export interface GetOrderSuccessAction {
  type: ActionTypes.GET_ORDER_SUCCESS;
  payload: Order;
}

export interface GetOrderFailureAction {
  type: ActionTypes.GET_ORDER_FAILURE;
  payload: string;
}

export interface ClearOrderErrorsAction {
  type: ActionTypes.CLEAR_ORDER_ERRORS;
}

export type OrderAction =
  | CreateOrderRequestAction
  | CreateOrderSuccessAction
  | CreateOrderFailureAction
  | MyOrdersRequestAction
  | MyOrdersSuccessAction
  | MyOrdersFailureAction
  | GetOrderRequestAction
  | GetOrderSuccessAction
  | GetOrderFailureAction
  | ClearOrderErrorsAction;
