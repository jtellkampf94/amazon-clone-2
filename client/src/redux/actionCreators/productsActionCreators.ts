import axios from "axios";
import { Dispatch } from "redux";
import {
  ClearErrorsAction,
  GetAllProductsFailureAction,
  GetAllProductsRequestAction,
  GetAllProductsSuccessAction,
  GetAdminProductsRequestAction,
  GetAdminProductsSuccessAction,
  GetAdminProductsFailureAction
} from "../actions";

import { ActionTypes } from "../actionTypes";

export const getProducts = (
  keyword: string,
  page: number,
  price: number[],
  category: string,
  rating: number
) => async (
  dispatch: Dispatch
): Promise<GetAllProductsSuccessAction | GetAllProductsFailureAction> => {
  try {
    const getAllProductsRequestAction: GetAllProductsRequestAction = {
      type: ActionTypes.GET_ALL_PRODUCTS_REQUEST
    };
    dispatch(getAllProductsRequestAction);

    let link = `/api/v1/products?keyword=${keyword}&page=${page.toString()}&price[lte]=${
      price[1]
    }&price[gte]=${price[0]}&rating[gte]=${rating.toString()}`;

    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${page.toString()}&price[lte]=${
        price[1]
      }&price[gte]=${
        price[0]
      }&category=${category}&rating[gte]=${rating.toString()}`;
    }

    const { data } = await axios.get(link);

    const action: GetAllProductsSuccessAction = {
      type: ActionTypes.GET_ALL_PRODUCTS_SUCCESS,
      payload: data
    };

    return dispatch(action);
  } catch (error) {
    const action: GetAllProductsFailureAction = {
      type: ActionTypes.GET_ALL_PRODUCTS_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const getAdminProducts = () => async (
  dispatch: Dispatch
): Promise<GetAdminProductsSuccessAction | GetAdminProductsFailureAction> => {
  try {
    const getAdminProductsRequestAction: GetAdminProductsRequestAction = {
      type: ActionTypes.GET_ADMIN_PRODUCTS_REQUEST
    };
    dispatch(getAdminProductsRequestAction);

    const { data } = await axios.get("/api/v1/admin/products");

    const action: GetAdminProductsSuccessAction = {
      type: ActionTypes.GET_ADMIN_PRODUCTS_SUCCESS,
      payload: data
    };

    return dispatch(action);
  } catch (error) {
    const action: GetAdminProductsFailureAction = {
      type: ActionTypes.GET_ADMIN_PRODUCTS_FAILURE,
      payload: error.response.data.message
    };
    return dispatch(action);
  }
};

export const clearErrors = () => (dispatch: Dispatch): ClearErrorsAction => {
  const action: ClearErrorsAction = { type: ActionTypes.CLEAR_PRODUCTS_ERRORS };
  return dispatch(action);
};
