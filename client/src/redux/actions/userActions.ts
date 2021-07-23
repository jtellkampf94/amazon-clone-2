import { ActionTypes } from "../actionTypes";

export interface UpdateProfileRequestAction {
  type: ActionTypes.UPDATE_PROFILE_REQUEST;
}

export interface UpdateProfileSuccessAction {
  type: ActionTypes.UPDATE_PROFILE_SUCCESS;
  payload: boolean;
}

export interface UpdateProfileResetAction {
  type: ActionTypes.UPDATE_PROFILE_RESET;
}

export interface UpdateProfileFailureAction {
  type: ActionTypes.UPDATE_PROFILE_FAILURE;
  payload: string;
}

export interface UpdatePasswordRequestAction {
  type: ActionTypes.UPDATE_PASSWORD_REQUEST;
}

export interface UpdatePasswordSuccessAction {
  type: ActionTypes.UPDATE_PASSWORD_SUCCESS;
  payload: boolean;
}

export interface UpdatePasswordResetAction {
  type: ActionTypes.UPDATE_PASSWORD_RESET;
}

export interface UpdatePasswordFailureAction {
  type: ActionTypes.UPDATE_PASSWORD_FAILURE;
  payload: string;
}

export interface ForgotPasswordRequestAction {
  type: ActionTypes.FORGOT_PASSWORD_REQUEST;
}

export interface ForgotPasswordSuccessAction {
  type: ActionTypes.FORGOT_PASSWORD_SUCCESS;
  payload: string;
}

export interface ForgotPasswordFailureAction {
  type: ActionTypes.FORGOT_PASSWORD_FAILURE;
  payload: string;
}

export interface ClearUserErrorsAction {
  type: ActionTypes.CLEAR_USER_ERRORS;
}

export type UserAction =
  | UpdateProfileRequestAction
  | UpdateProfileSuccessAction
  | UpdateProfileResetAction
  | UpdateProfileFailureAction
  | UpdatePasswordRequestAction
  | UpdatePasswordSuccessAction
  | UpdatePasswordResetAction
  | UpdatePasswordFailureAction
  | ForgotPasswordRequestAction
  | ForgotPasswordSuccessAction
  | ForgotPasswordFailureAction
  | ClearUserErrorsAction;
