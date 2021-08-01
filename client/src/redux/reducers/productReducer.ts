import { ProductAction } from "../actions/productActions";
import { ActionTypes } from "../actionTypes";
import { Product } from "./productsReducer";

interface ProductState {
  product: Product | null;
  newProduct: Product | null;
  loading: boolean;
  errors: string | null;
  success: boolean;
}

const initialState: ProductState = {
  newProduct: null,
  product: null,
  loading: false,
  errors: null,
  success: false
};

const productReducer = (
  state: ProductState = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case ActionTypes.GET_PRODUCT_REQUEST:
    case ActionTypes.CREATE_REVIEW_REQUEST:
    case ActionTypes.CREATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload
      };
    case ActionTypes.CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        newProduct: action.payload
      };
    case ActionTypes.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload
      };
    case ActionTypes.CREATE_REVIEW_FAILURE:
    case ActionTypes.GET_PRODUCT_FAILURE:
    case ActionTypes.CREATE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case ActionTypes.REVIEW_RESET:
    case ActionTypes.PRODUCT_RESET:
      return {
        ...state,
        loading: false,
        success: false
      };
    case ActionTypes.CLEAR_PRODUCT_ERRORS:
      return {
        ...state,
        errors: null
      };
    default:
      return state;
  }
};

export default productReducer;
