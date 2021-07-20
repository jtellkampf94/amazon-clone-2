import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import productsReducer from "./productsReducer";

const reducers = combineReducers({
  products: productsReducer,
  product: productReducer,
  auth: authReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
