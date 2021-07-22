export enum ActionTypes {
  GET_ALL_PRODUCTS_REQUEST = "get_all_products_request",
  GET_ALL_PRODUCTS_SUCCESS = "get_all_products_success",
  GET_ALL_PRODUCTS_FAILURE = "get_all_products_failure",
  CLEAR_PRODUCTS_ERRORS = "clear_products_errors",

  GET_PRODUCT_REQUEST = "get_product_request",
  GET_PRODUCT_SUCCESS = "get_product_success",
  GET_PRODUCT_FAILURE = "get_product_failure",
  CLEAR_PRODUCT_ERRORS = "clear_product_errors",

  LOGIN_REQUEST = "login_request",
  LOGIN_SUCCESS = "login_success",
  LOGIN_FAILURE = "login_failure",
  CLEAR_AUTH_ERRORS = "clear_auth_errors",

  REGISTER_REQUEST = "register_request",
  REGISTER_SUCCESS = "register_success",
  REGISTER_FAILURE = "register_failure",

  LOAD_USER_REQUEST = "load_user_request",
  LOAD_USER_SUCCESS = "load_user_success",
  LOAD_USER_FAILURE = "load_user_failure"
}
