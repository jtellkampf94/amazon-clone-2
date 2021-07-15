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
  authourizedRoles
} from "../middlewares/authMiddleware";

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authourizedRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authourizedRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authourizedRoles("admin"), deleteProduct);

export default router;
