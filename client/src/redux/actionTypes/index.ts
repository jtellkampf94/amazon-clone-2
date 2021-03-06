export enum ActionTypes {
  GET_ALL_PRODUCTS_REQUEST = "get_all_products_request",
  GET_ALL_PRODUCTS_SUCCESS = "get_all_products_success",
  GET_ALL_PRODUCTS_FAILURE = "get_all_products_failure",
  CLEAR_PRODUCTS_ERRORS = "clear_products_errors",

  GET_ADMIN_PRODUCTS_REQUEST = "get_admin_products_request",
  GET_ADMIN_PRODUCTS_SUCCESS = "get_admin_products_success",
  GET_ADMIN_PRODUCTS_FAILURE = "get_admin_products_failure",

  CREATE_PRODUCT_REQUEST = "create_product_request",
  CREATE_PRODUCT_SUCCESS = "create_product_success",
  CREATE_PRODUCT_FAILURE = "create_product_failure",
  PRODUCT_RESET = "product_reset",

  DELETE_PRODUCT_REQUEST = "delete_product_request",
  DELETE_PRODUCT_SUCCESS = "delete_product_success",
  DELETE_PRODUCT_FAILURE = "delete_product_failure",

  UPDATE_PRODUCT_REQUEST = "update_product_request",
  UPDATE_PRODUCT_SUCCESS = "update_product_success",
  UPDATE_PRODUCT_FAILURE = "update_product_failure",

  GET_PRODUCT_REQUEST = "get_product_request",
  GET_PRODUCT_SUCCESS = "get_product_success",
  GET_PRODUCT_FAILURE = "get_product_failure",
  CLEAR_PRODUCT_ERRORS = "clear_product_errors",

  CREATE_REVIEW_REQUEST = "create_review_request",
  CREATE_REVIEW_SUCCESS = "create_review_success",
  CREATE_REVIEW_FAILURE = "create_review_failure",
  REVIEW_RESET = "review_reset",

  GET_REVIEWS_REQUEST = "get_reviews_request",
  GET_REVIEWS_SUCCESS = "get_reviews_success",
  GET_REVIEWS_FAILURE = "get_reviews_failure",

  DELETE_REVIEW_REQUEST = "delete_review_request",
  DELETE_REVIEW_SUCCESS = "delete_review_success",
  DELETE_REVIEW_FAILURE = "delete_review_failure",

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
  UPDATE_PASSWORD_FAILURE = "update_password_failure",
  USER_RESET = "user_reset",
  CLEAR_USER_ERRORS = "clear_user_errors",

  UPDATE_PROFILE_REQUEST = "update_profile_request",
  UPDATE_PROFILE_SUCCESS = "update_profile_success",
  UPDATE_PROFILE_FAILURE = "update_profile_failure",

  FORGOT_PASSWORD_REQUEST = "forgot_password_request",
  FORGOT_PASSWORD_SUCCESS = "forgot_password_success",
  FORGOT_PASSWORD_FAILURE = "forgot_password_failure",

  NEW_PASSWORD_REQUEST = "new_password_request",
  NEW_PASSWORD_SUCCESS = "new_password_success",
  NEW_PASSWORD_FAILURE = "new_password_failure",

  GET_ALL_USERS_REQUEST = "get_all_users_request",
  GET_ALL_USERS_SUCCESS = "get_all_users_success",
  GET_ALL_USERS_FAILURE = "get_all_users_failure",

  GET_USER_REQUEST = "get_user_request",
  GET_USER_SUCCESS = "get_user_success",
  GET_USER_FAILURE = "get_user_failure",

  DELETE_USER_REQUEST = "delete_user_request",
  DELETE_USER_SUCCESS = "delete_user_success",
  DELETE_USER_FAILURE = "delete_user_failure",

  UPDATE_USER_REQUEST = "update_user_request",
  UPDATE_USER_SUCCESS = "update_user_success",
  UPDATE_USER_FAILURE = "update_user_failure",

  ADD_TO_CART = "add_to_cart",
  REMOVE_FROM_CART = "remove_from_cart",
  SAVE_SHIPPING_INFO = "save_shipping_info",

  CREATE_ORDER_REQUEST = "create_order_request",
  CREATE_ORDER_SUCCESS = "create_order_success",
  CREATE_ORDER_FAILURE = "create_order_failure",
  CLEAR_ORDER_ERRORS = "clear_order_errors",

  MY_ORDERS_REQUEST = "my_orders_request",
  MY_ORDERS_SUCCESS = "my_orders_success",
  MY_ORDERS_FAILURE = "my_orders_failure",

  GET_ORDER_REQUEST = "get_order_request",
  GET_ORDER_SUCCESS = "get_order_success",
  GET_ORDER_FAILURE = "get_order_failure",

  GET_ORDERS_REQUEST = "get_orders_request",
  GET_ORDERS_SUCCESS = "get_orders_success",
  GET_ORDERS_FAILURE = "get_orders_failure",

  UPDATE_ORDER_REQUEST = "update_order_request",
  UPDATE_ORDER_SUCCESS = "update_order_success",
  UPDATE_ORDER_FAILURE = "update_order_failure",
  ORDER_RESET = "order_reset",

  DELETE_ORDER_REQUEST = "delete_order_request",
  DELETE_ORDER_SUCCESS = "delete_order_success",
  DELETE_ORDER_FAILURE = "delete_order_failure"
}
