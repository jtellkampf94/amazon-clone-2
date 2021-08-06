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

export interface CreateProductRequestAction {
  type: ActionTypes.CREATE_PRODUCT_REQUEST;
}

export interface CreateProductSuccessAction {
  type: ActionTypes.CREATE_PRODUCT_SUCCESS;
  payload: { product: Product; success: boolean };
}

export interface CreateProductFailureAction {
  type: ActionTypes.CREATE_PRODUCT_FAILURE;
  payload: string;
}

export interface DeleteProductRequestAction {
  type: ActionTypes.DELETE_PRODUCT_REQUEST;
}

export interface DeleteProductSuccessAction {
  type: ActionTypes.DELETE_PRODUCT_SUCCESS;
  payload: boolean;
}

export interface DeleteProductFailureAction {
  type: ActionTypes.DELETE_PRODUCT_FAILURE;
  payload: string;
}

export interface UpdateProductRequestAction {
  type: ActionTypes.UPDATE_PRODUCT_REQUEST;
}

export interface UpdateProductSuccessAction {
  type: ActionTypes.UPDATE_PRODUCT_SUCCESS;
  payload: boolean;
}

export interface UpdateProductFailureAction {
  type: ActionTypes.UPDATE_PRODUCT_FAILURE;
  payload: string;
}

export interface ProductResetAction {
  type: ActionTypes.PRODUCT_RESET;
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
  | CreateProductFailureAction
  | CreateProductRequestAction
  | CreateProductSuccessAction
  | DeleteProductFailureAction
  | DeleteProductRequestAction
  | DeleteProductSuccessAction
  | UpdateProductFailureAction
  | UpdateProductRequestAction
  | UpdateProductSuccessAction
  | ProductResetAction
  | ClearProductErrorsAction;
