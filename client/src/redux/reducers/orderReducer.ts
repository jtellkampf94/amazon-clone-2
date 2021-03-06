import { OrderAction } from "./../actions";
import { ActionTypes } from "../actionTypes";
import { ShippingInfo } from "./cartReducer";

export interface Order {
  _id?: string;
  shippingInfo: ShippingInfo;
  user?: { _id: string; name: string };
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
  newOrder: Order | null;
  allOrders: Order[] | null;
  totalAmount: number;
  isUpdated: boolean;
  isDeleted: boolean;
}

const initialState: OrderState = {
  order: null,
  loading: false,
  errors: null,
  orders: null,
  newOrder: null,
  allOrders: null,
  totalAmount: 0,
  isUpdated: false,
  isDeleted: false
};

const orderReducer = (
  state: OrderState = initialState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case ActionTypes.CREATE_ORDER_REQUEST:
    case ActionTypes.MY_ORDERS_REQUEST:
    case ActionTypes.GET_ORDER_REQUEST:
    case ActionTypes.GET_ORDERS_REQUEST:
    case ActionTypes.UPDATE_ORDER_REQUEST:
    case ActionTypes.DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        newOrder: action.payload
      };
    case ActionTypes.GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload
      };
    case ActionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        allOrders: action.payload.orders,
        totalAmount: action.payload.totalAmount
      };
    case ActionTypes.MY_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload
      };
    case ActionTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload
      };
    case ActionTypes.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload
      };
    case ActionTypes.MY_ORDERS_FAILURE:
    case ActionTypes.CREATE_ORDER_FAILURE:
    case ActionTypes.GET_ORDER_FAILURE:
    case ActionTypes.GET_ORDERS_FAILURE:
    case ActionTypes.UPDATE_ORDER_FAILURE:
    case ActionTypes.DELETE_ORDER_FAILURE:
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
    case ActionTypes.ORDER_RESET:
      return {
        ...state,
        loading: false,
        isUpdated: false,
        isDeleted: false
      };
    default:
      return state;
  }
};

export default orderReducer;
