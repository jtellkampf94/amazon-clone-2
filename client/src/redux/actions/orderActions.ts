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

export interface GetOrdersRequestAction {
  type: ActionTypes.GET_ORDERS_REQUEST;
}

export interface GetOrdersSuccessAction {
  type: ActionTypes.GET_ORDERS_SUCCESS;
  payload: { orders: Order[]; success: boolean; totalAmount: number };
}

export interface GetOrdersFailureAction {
  type: ActionTypes.GET_ORDERS_FAILURE;
  payload: string;
}

export interface UpdateOrdersRequestAction {
  type: ActionTypes.UPDATE_ORDER_REQUEST;
}

export interface UpdateOrdersSuccessAction {
  type: ActionTypes.UPDATE_ORDER_SUCCESS;
  payload: boolean;
}

export interface UpdateOrdersFailureAction {
  type: ActionTypes.UPDATE_ORDER_FAILURE;
  payload: string;
}

export interface OrderResetAction {
  type: ActionTypes.ORDER_RESET;
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
  | GetOrdersRequestAction
  | GetOrdersSuccessAction
  | GetOrdersFailureAction
  | UpdateOrdersRequestAction
  | UpdateOrdersSuccessAction
  | UpdateOrdersFailureAction
  | OrderResetAction
  | ClearOrderErrorsAction;
