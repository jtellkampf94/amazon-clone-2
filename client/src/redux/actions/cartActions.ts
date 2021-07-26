import { ActionTypes } from "../actionTypes";
import { CartItem } from "./../reducers/cartReducer";

export interface AddToCartAction {
  type: ActionTypes.ADD_TO_CART;
  payload: CartItem;
}

export interface RemoveFromCartAction {
  type: ActionTypes.REMOVE_FROM_CART;
  payload: string;
}

export interface SaveShippingInfoAction {
  type: ActionTypes.SAVE_SHIPPING_INFO;
  payload: string;
}

export type CartAction =
  | AddToCartAction
  | RemoveFromCartAction
  | SaveShippingInfoAction;
