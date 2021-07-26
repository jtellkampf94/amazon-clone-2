import { CartAction } from "./../actions";
import { ActionTypes } from "../actionTypes";

export interface CartItem {
  product: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  shippingInfo: null | string;
}

const initialState: CartState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
  shippingInfo: null
};

const cartReducer = (
  state: CartState = initialState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case ActionTypes.ADD_TO_CART:
      const item = action.payload;

      const itemExists = state.cartItems.find(i => i.product === item.product);

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i.product === itemExists.product ? item : i
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        };
      }
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i.product !== action.payload)
      };
    case ActionTypes.SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload
      };
    default:
      return state;
  }
};

export default cartReducer;
