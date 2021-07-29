import { Product } from "../reducers/productsReducer";
import { ActionTypes } from "../actionTypes";

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

export interface CreateReviewRequestAction {
  type: ActionTypes.CREATE_REVIEW_REQUEST;
}

export interface CreateReviewSuccessAction {
  type: ActionTypes.CREATE_REVIEW_SUCCESS;
  payload: boolean;
}

export interface CreateReviewFailureAction {
  type: ActionTypes.CREATE_REVIEW_FAILURE;
  payload: string;
}

export interface ReviewResetAction {
  type: ActionTypes.REVIEW_RESET;
}

export interface ClearProductErrorsAction {
  type: ActionTypes.CLEAR_PRODUCT_ERRORS;
}

export type ProductAction =
  | GetProductFailureAction
  | GetProductRequestAction
  | GetProductSuccessAction
  | CreateReviewFailureAction
  | CreateReviewRequestAction
  | CreateReviewSuccessAction
  | ReviewResetAction
  | ClearProductErrorsAction;
