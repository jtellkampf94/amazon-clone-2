import { ProductAction } from "../actions";
import { ActionTypes } from "../actionTypes";

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  images: {
    publicId: string;
    url: string;
  }[];
  categories:
    | "Electronics"
    | "Cameras"
    | "Laptops"
    | "Accessories"
    | "Headphones"
    | "Food"
    | "Books"
    | "Clothes/Shoes"
    | "Beauty/Health"
    | "Sports"
    | "Outdoor"
    | "Home";
  seller: string;
  stock: number;
  numberOfReviews: number;
  reviews: {
    user: string;
    name: string;
    rating: number;
    comment: string;
  };
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductState {
  loading: boolean;
  products: Product[];
  productsCount: number;
  errors: null | string;
}

const initialState: ProductState = {
  loading: false,
  products: [],
  productsCount: 0,
  errors: null
};

const productReducer = (
  state: ProductState = initialState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case ActionTypes.GET_ALL_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        products: []
      };
    case ActionTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount
      };
    case ActionTypes.GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case ActionTypes.CLEAR_ERRORS:
      return {
        ...state,
        errors: null
      };
    default:
      return state;
  }
};

export default productReducer;
