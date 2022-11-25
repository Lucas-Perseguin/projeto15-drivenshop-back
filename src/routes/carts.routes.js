import {
  decreaseProductInCart,
  deleteProductFromUserCart,
  deleteUserCart,
  postProductToCart,
} from '../controllers/carts.controller.js';

import jwtValidation from '../middlewares/jwtValidation.middleware.js';

import { Router } from 'express';

const router = Router();

router.use(jwtValidation);

router.post('/add/:productId', postProductToCart);
router.post('/remove/:productId', decreaseProductInCart);
router.delete('/delete/:productId', deleteProductFromUserCart);
router.delete('/deleteCart', deleteUserCart);

export default router;
