import express from "express";
const router = express.Router();

import {
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController";
import {
  isAuthenticatedUser,
  authorizedRoles
} from "../middlewares/authMiddleware";

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizedRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteProduct);

export default router;
