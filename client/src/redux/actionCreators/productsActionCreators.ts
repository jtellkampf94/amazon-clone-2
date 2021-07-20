import axios from "axios";
import { Dispatch } from "redux";
import {
  ClearErrorsAction,
  GetAllProductsFailureAction,
  GetAllProductsRequestAction,
  GetAllProductsSuccessAction
} from "../actions";

import { ActionTypes } from "../actionTypes";

export const getProducts = (
  keyword: string,
  page: number,
  price: number[],
  category: string
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
    }&price[gte]=${price[0]}`;

    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${page.toString()}&price[lte]=${
        price[1]
      }&price[gte]=${price[0]}&category=${category}`;
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

export const clearErrors = () => (dispatch: Dispatch): ClearErrorsAction => {
  const action: ClearErrorsAction = { type: ActionTypes.CLEAR_ERRORS };
  return dispatch(action);
};
