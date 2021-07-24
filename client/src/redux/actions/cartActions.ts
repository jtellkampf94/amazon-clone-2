import { ActionTypes } from "../actionTypes";
import { CartItem } from "./../reducers/cartReducer";

export interface AddToCartAction {
  type: ActionTypes.ADD_TO_CART;
  payload: CartItem;
}

export type CartAction = AddToCartAction;
