import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "./../reducers";
import {
  AddToCartAction,
  RemoveFromCartAction,
  SaveShippingInfoAction
} from "../actions";

import { ActionTypes } from "../actionTypes";

export const addToCart = (id: string, quantity: number) => async (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const { data } = await axios.get(`/api/v1/product/${id}`);

  const action: AddToCartAction = {
    type: ActionTypes.ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity
    }
  };

  dispatch(action);
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const action: RemoveFromCartAction = {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: id
  };

  dispatch(action);
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data: string) => (dispatch: Dispatch) => {
  const action: SaveShippingInfoAction = {
    type: ActionTypes.SAVE_SHIPPING_INFO,
    payload: data
  };

  dispatch(action);
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
