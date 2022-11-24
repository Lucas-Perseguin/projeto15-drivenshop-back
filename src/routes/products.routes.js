import {
  getProductById,
  getProducts,
} from '../controllers/products.controller.js';

import { Router } from 'express';

const router = Router();

router.get('/products', getProducts);
router.get('/product/:productId', getProductById);

export default router;
