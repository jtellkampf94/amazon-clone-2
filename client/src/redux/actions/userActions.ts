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

export interface ClearUserErrorsAction {
  type: ActionTypes.CLEAR_USER_ERRORS;
}

export type UserAction =
  | UpdateProfileRequestAction
  | UpdateProfileSuccessAction
  | UpdateProfileResetAction
  | UpdateProfileFailureAction
  | ClearUserErrorsAction;
