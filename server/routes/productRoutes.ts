import express from "express";
const router = express.Router();

import {
  getProducts,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController";

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);

router.route("/admin/products/new").post(createProduct);

router
  .route("/admin/product/:id")
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
