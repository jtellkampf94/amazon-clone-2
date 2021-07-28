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
  LOAD_USER_FAILURE = "load_user_failure",

  LOGOUT_SUCCESS = "logout_success",
  LOGOUT_FAILURE = "logout_failure",

  UPDATE_PASSWORD_REQUEST = "update_password_request",
  UPDATE_PASSWORD_SUCCESS = "update_password_success",
  UPDATE_PASSWORD_RESET = "update_password_reset",
  UPDATE_PASSWORD_FAILURE = "update_password_failure",
  CLEAR_USER_ERRORS = "clear_user_errors",

  UPDATE_PROFILE_REQUEST = "update_profile_request",
  UPDATE_PROFILE_SUCCESS = "update_profile_success",
  UPDATE_PROFILE_RESET = "update_profile_reset",
  UPDATE_PROFILE_FAILURE = "update_profile_failure",

  FORGOT_PASSWORD_REQUEST = "forgot_password_request",
  FORGOT_PASSWORD_SUCCESS = "forgot_password_success",
  FORGOT_PASSWORD_FAILURE = "forgot_password_failure",

  NEW_PASSWORD_REQUEST = "new_password_request",
  NEW_PASSWORD_SUCCESS = "new_password_success",
  NEW_PASSWORD_FAILURE = "new_password_failure",

  ADD_TO_CART = "add_to_cart",
  REMOVE_FROM_CART = "remove_from_cart",
  SAVE_SHIPPING_INFO = "save_shipping_info",

  CREATE_ORDER_REQUEST = "create_order_request",
  CREATE_ORDER_SUCCESS = "create_order_success",
  CREATE_ORDER_FAILURE = "create_order_failure",
  CLEAR_ORDER_ERRORS = "clear_order_errors"
}
