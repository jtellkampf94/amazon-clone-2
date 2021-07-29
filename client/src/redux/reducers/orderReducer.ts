import { OrderAction } from "./../actions";
import { ActionTypes } from "../actionTypes";
import { ShippingInfo } from "./cartReducer";

export interface Order {
  _id?: string;
  shippingInfo: ShippingInfo;
  user?: string;
  orderItems: {
    name: string;
    quantity: number;
    image: string;
    price: number;
    product: string;
  }[];
  paymentInfo: {
    id: string;
    status: string;
  };
  paidAt?: Date;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus?: number;
  deliveredAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface OrderState {
  order: Order | null;
  loading: boolean;
  errors: null | string;
  orders: Order[] | null;
}

const initialState: OrderState = {
  order: null,
  loading: false,
  errors: null,
  orders: null
};

const orderReducer = (
  state: OrderState = initialState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case ActionTypes.CREATE_ORDER_REQUEST:
    case ActionTypes.MY_ORDERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload
      };
    case ActionTypes.MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload
      };
    case ActionTypes.MY_ORDERS_FAILURE:
    case ActionTypes.CREATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case ActionTypes.CLEAR_ORDER_ERRORS:
      return {
        ...state,
        errors: null
      };

    default:
      return state;
  }
};

export default orderReducer;
