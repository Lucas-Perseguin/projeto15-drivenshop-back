import { Router } from 'express';

import {
  postUserSignUp,
  postUserSignIn,
  getIsToken,
  getUserById,
} from '../controllers/users.controller.js';
import userSchemaValidation from '../middlewares/userSchemaValidation.middleware.js';
import userSignUpEmailValidation from '../middlewares/userSignUpEmailValidation.middleware.js';
import signInSchemaValidation from '../middlewares/signInSchemaValidation.middleware.js';
import signInValidation from '../middlewares/signInValidation.middleware.js';
import jwtValidation from '../middlewares/jwtValidation.middleware.js';

const router = Router();

router.post(
  '/sign-up',
  userSchemaValidation,
  userSignUpEmailValidation,
  postUserSignUp
);

router.post(
  '/sign-in',
  signInSchemaValidation,
  signInValidation,
  postUserSignIn
);

router.use(jwtValidation);

router.get('/user', getUserById);

router.get('/token', getIsToken);

export default router;
