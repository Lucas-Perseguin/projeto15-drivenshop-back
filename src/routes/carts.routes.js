import { postProductToCart } from '../controllers/carts.controller.js';

import jwtValidation from '../middlewares/jwtValidation.middleware.js';

import { Router } from 'express';

const router = Router();

router.use(jwtValidation);

router.post('/add/:productId', postProductToCart);

export default router;
