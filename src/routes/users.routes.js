import {
  postUserSignUp,
  postUserSignIn,
} from '../controllers/users.controller.js';

import userSchemaValidation from '../middlewares/userSchemaValidation.middleware.js';
import userSignUpEmailValidation from '../middlewares/userSignUpEmailValidation.middleware.js';

import { Router } from 'express';

const router = Router();

router.post(
  '/sign-up',
  userSchemaValidation,
  userSignUpEmailValidation,
  postUserSignUp
);

router.post('/sign-in', postUserSignIn);

export default router;
