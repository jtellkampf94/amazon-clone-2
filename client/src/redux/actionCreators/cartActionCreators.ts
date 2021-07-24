import axios from "axios";
import { Dispatch } from "redux";
import { RootState } from "./../reducers";
import { AddToCartAction } from "../actions";

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

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  dispatch(action);
};
