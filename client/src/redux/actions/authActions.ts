import { User } from "./../reducers/authReducer";
import { ActionTypes } from "../actionTypes";

export interface LoginRequestAction {
  type: ActionTypes.LOGIN_REQUEST;
}

export interface LoginSuccessAction {
  type: ActionTypes.LOGIN_SUCCESS;
  payload: User;
}

export interface LoginFailureAction {
  type: ActionTypes.LOGIN_FAILURE;
  payload: string;
}

export interface ClearLoginErrorsAction {
  type: ActionTypes.CLEAR_LOGIN_ERRORS;
}

export type AuthAction =
  | LoginFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | ClearLoginErrorsAction;
