import { ProductsAction } from "../actions";
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
    _id: string;
    user: string;
    name: string;
    rating: number;
    comment: string;
  }[];
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ProductsState {
  loading: boolean;
  products: Product[];
  productsCount: number;
  resultsPerPage: number;
  filteredProductsCount: number;
  errors: null | string;
}

const initialState: ProductsState = {
  loading: false,
  products: [],
  productsCount: 0,
  resultsPerPage: 0,
  filteredProductsCount: 0,
  errors: null
};

const productsReducer = (
  state: ProductsState = initialState,
  action: ProductsAction
): ProductsState => {
  switch (action.type) {
    case ActionTypes.GET_ALL_PRODUCTS_REQUEST:
    case ActionTypes.GET_ADMIN_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        products: []
      };
    case ActionTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        resultsPerPage: action.payload.resultsPerPage,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        filteredProductsCount: action.payload.filteredProductsCount
      };
    case ActionTypes.GET_ADMIN_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products
      };
    case ActionTypes.GET_ALL_PRODUCTS_FAILURE:
    case ActionTypes.GET_ADMIN_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload
      };
    case ActionTypes.CLEAR_PRODUCTS_ERRORS:
      return {
        ...state,
        errors: null
      };
    default:
      return state;
  }
};

export default productsReducer;
