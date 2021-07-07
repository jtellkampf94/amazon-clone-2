import express from "express";
const router = express.Router();

import { getProducts, createProduct } from "../controllers/productController";

router.route("/products").get(getProducts);

router.route("/products/new").post(createProduct);

export default router;
