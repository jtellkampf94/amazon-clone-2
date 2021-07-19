import { Product } from "../reducers/productsReducer";
import { ActionTypes } from "../actionTypes/index";

export interface GetProductRequestAction {
  type: ActionTypes.GET_PRODUCT_REQUEST;
}

export interface GetProductSuccessAction {
  type: ActionTypes.GET_PRODUCT_SUCCESS;
  payload: Product;
}

export interface GetProductFailureAction {
  type: ActionTypes.GET_PRODUCT_FAILURE;
  payload: string;
}

export interface ClearProductErrorsAction {
  type: ActionTypes.CLEAR_ERRORS;
}

export type ProductAction =
  | GetProductFailureAction
  | GetProductRequestAction
  | GetProductSuccessAction
  | ClearProductErrorsAction;
