import { Product } from "./../reducers/productReducer";
import { ActionTypes } from "../actionTypes/index";

export interface GetAllProductsRequestAction {
  type: ActionTypes.GET_ALL_PRODUCTS_REQUEST;
}

export interface GetAllProductsSuccessAction {
  type: ActionTypes.GET_ALL_PRODUCTS_SUCCESS;
  payload: {
    success: boolean;
    count: number;
    productsCount: number;
    products: Product[];
  };
}

export interface GetAllProductsFailureAction {
  type: ActionTypes.GET_ALL_PRODUCTS_FAILURE;
  payload: string;
}

export interface ClearErrorsAction {
  type: ActionTypes.CLEAR_ERRORS;
}

export type ProductAction =
  | GetAllProductsFailureAction
  | GetAllProductsRequestAction
  | GetAllProductsSuccessAction
  | ClearErrorsAction;
