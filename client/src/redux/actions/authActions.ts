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

export interface ClearAuthErrorsAction {
  type: ActionTypes.CLEAR_AUTH_ERRORS;
}

export interface RegisterRequestAction {
  type: ActionTypes.REGISTER_REQUEST;
}

export interface RegisterSuccessAction {
  type: ActionTypes.REGISTER_SUCCESS;
  payload: User;
}

export interface RegisterFailureAction {
  type: ActionTypes.REGISTER_FAILURE;
  payload: string;
}

export type AuthAction =
  | LoginFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | ClearAuthErrorsAction
  | RegisterRequestAction
  | RegisterSuccessAction
  | RegisterFailureAction;
