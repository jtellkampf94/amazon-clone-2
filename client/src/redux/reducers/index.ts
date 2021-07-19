import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productsReducer from "./productsReducer";

const reducers = combineReducers({
  products: productsReducer,
  product: productReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
