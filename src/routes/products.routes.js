import {
  getProductById,
  getProducts,
  getProductsByType,
  getProductsByTypeOnSale,
} from "../controllers/products.controller.js";

import { Router } from "express";

const router = Router();

router.get("/products", getProducts);
router.get("/product/:productId", getProductById);
router.get("/products/:productType", getProductsByType);
router.get("/products/:productType/sale", getProductsByTypeOnSale);

export default router;
