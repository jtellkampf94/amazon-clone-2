import express from "express";
const router = express.Router();

import {
  getProducts,
  getAdminProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReview
} from "../controllers/productController";
import {
  isAuthenticatedUser,
  authorizedRoles
} from "../middlewares/authMiddleware";

router.route("/products").get(getProducts);
router.route("/admin/products").get(getAdminProducts);
router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

router
  .route("/review")
  .put(isAuthenticatedUser, createProductReview)
  .delete(isAuthenticatedUser, deleteReview);
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);

export default router;
