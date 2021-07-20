import { ProductAction } from "../actions/productActions";
import { ActionTypes } from "../actionTypes";
import { Product } from "./productsReducer";

interface ProductState {
  product: Product | null;
  loading: boolean;
  errors: string | null;
}

const initialState: ProductState = {
  product: null,
  loading: false,
  errors: null
};

const productReducer = (
  state: ProductState = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case ActionTypes.GET_PRODUCT_REQUEST:
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
    case ActionTypes.GET_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload
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
