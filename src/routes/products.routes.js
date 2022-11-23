import { getProducts } from '../controllers/products.controller.js';

import { Router } from 'express';

const router = Router();

router.get('/products', getProducts);

export default router;
