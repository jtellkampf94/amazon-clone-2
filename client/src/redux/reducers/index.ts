import { combineReducers } from "redux";
import authReducer from "./authReducer";
import productReducer from "./productReducer";
import productsReducer from "./productsReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
  products: productsReducer,
  product: productReducer,
  auth: authReducer,
  user: userReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
