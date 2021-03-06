import axios from "axios";
import { Dispatch } from "redux";
import {
  ClearProductErrorsAction,
  GetProductFailureAction,
  GetProductRequestAction,
  GetProductSuccessAction,
  CreateReviewRequestAction,
  CreateReviewSuccessAction,
  CreateReviewFailureAction,
  CreateProductRequestAction,
  CreateProductSuccessAction,
  CreateProductFailureAction,
  DeleteProductRequestAction,
  DeleteProductSuccessAction,
  DeleteProductFailureAction,
  UpdateProductRequestAction,
  UpdateProductSuccessAction,
  UpdateProductFailureAction,
  GetReviewsRequestAction,
  GetReviewsSuccessAction,
  GetReviewsFailureAction,
  DeleteReviewRequestAction,
  DeleteReviewSuccessAction,
  DeleteReviewFailureAction,
  ProductResetAction,
  ReviewResetAction
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

interface Review {
  rating: number;
  comment: string;
  productId: string;
}

export const createReview = (review: Review) => async (
  dispatch: Dispatch
): Promise<CreateReviewSuccessAction | CreateReviewFailureAction> => {
  try {
    const createReviewRequestAction: CreateReviewRequestAction = {
      type: ActionTypes.CREATE_REVIEW_REQUEST
    };
    dispatch(createReviewRequestAction);

    const { data } = await axios.put(`/api/v1/review`, review, {
      headers: { "Content-Type": "application/json" }
    });
    const action: CreateReviewSuccessAction = {
      type: ActionTypes.CREATE_REVIEW_SUCCESS,
      payload: data.success
    };

    return dispatch(action);
  } catch (error) {
    const action: CreateReviewFailureAction = {
      type: ActionTypes.CREATE_REVIEW_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export interface ProductData {
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  seller: string;
  images: any[];
}

export const createProduct = (productData: ProductData) => async (
  dispatch: Dispatch
): Promise<CreateProductSuccessAction | CreateProductFailureAction> => {
  try {
    const createProductRequestAction: CreateProductRequestAction = {
      type: ActionTypes.CREATE_PRODUCT_REQUEST
    };
    dispatch(createProductRequestAction);

    const { data } = await axios.post(
      `/api/v1/admin/product/new`,
      productData,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    const action: CreateProductSuccessAction = {
      type: ActionTypes.CREATE_PRODUCT_SUCCESS,
      payload: data
    };

    return dispatch(action);
  } catch (error) {
    const action: CreateProductFailureAction = {
      type: ActionTypes.CREATE_PRODUCT_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const deleteProduct = (id: string) => async (
  dispatch: Dispatch
): Promise<DeleteProductSuccessAction | DeleteProductFailureAction> => {
  try {
    const deleteProductRequestAction: DeleteProductRequestAction = {
      type: ActionTypes.DELETE_PRODUCT_REQUEST
    };
    dispatch(deleteProductRequestAction);

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);
    const action: DeleteProductSuccessAction = {
      type: ActionTypes.DELETE_PRODUCT_SUCCESS,
      payload: data.success
    };

    return dispatch(action);
  } catch (error) {
    const action: DeleteProductFailureAction = {
      type: ActionTypes.DELETE_PRODUCT_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const updateProduct = (id: string, productData: ProductData) => async (
  dispatch: Dispatch
): Promise<UpdateProductSuccessAction | UpdateProductFailureAction> => {
  try {
    const updateProductRequestAction: UpdateProductRequestAction = {
      type: ActionTypes.UPDATE_PRODUCT_REQUEST
    };
    dispatch(updateProductRequestAction);

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      { headers: { "Content-Type": "application/json" } }
    );
    const action: UpdateProductSuccessAction = {
      type: ActionTypes.UPDATE_PRODUCT_SUCCESS,
      payload: data.success
    };

    return dispatch(action);
  } catch (error) {
    const action: UpdateProductFailureAction = {
      type: ActionTypes.UPDATE_PRODUCT_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const getReviews = (id: string) => async (
  dispatch: Dispatch
): Promise<GetReviewsSuccessAction | GetReviewsFailureAction> => {
  try {
    const getReviewsRequestAction: GetReviewsRequestAction = {
      type: ActionTypes.GET_REVIEWS_REQUEST
    };
    dispatch(getReviewsRequestAction);

    const { data } = await axios.get(`/api/v1/reviews?id=${id}`);
    const action: GetReviewsSuccessAction = {
      type: ActionTypes.GET_REVIEWS_SUCCESS,
      payload: data.reviews
    };

    return dispatch(action);
  } catch (error) {
    const action: GetReviewsFailureAction = {
      type: ActionTypes.GET_REVIEWS_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const deleteReview = (id: string, productId: string) => async (
  dispatch: Dispatch
): Promise<DeleteReviewSuccessAction | DeleteReviewFailureAction> => {
  try {
    const deleteReviewRequestAction: DeleteReviewRequestAction = {
      type: ActionTypes.DELETE_REVIEW_REQUEST
    };
    dispatch(deleteReviewRequestAction);

    const { data } = await axios.delete(
      `/api/v1/review?id=${id}&productId=${productId}`
    );
    const action: DeleteReviewSuccessAction = {
      type: ActionTypes.DELETE_REVIEW_SUCCESS,
      payload: data.success
    };

    return dispatch(action);
  } catch (error) {
    const action: DeleteReviewFailureAction = {
      type: ActionTypes.DELETE_REVIEW_FAILURE,
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

export const reviewReset = () => (dispatch: Dispatch): ReviewResetAction => {
  const action: ReviewResetAction = {
    type: ActionTypes.REVIEW_RESET
  };
  return dispatch(action);
};

export const productReset = () => (dispatch: Dispatch): ProductResetAction => {
  const action: ProductResetAction = {
    type: ActionTypes.PRODUCT_RESET
  };
  return dispatch(action);
};
