import express from "express";
const router = express.Router();

import {
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController";
import { isAuthenticatedUser } from "../middlewares/authMiddleware";

router.route("/products").get(isAuthenticatedUser, getProducts);
router.route("/product/:id").get(getSingleProduct);

router.route("/admin/products/new").post(isAuthenticatedUser, createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct);

export default router;
