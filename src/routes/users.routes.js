import {
  postUserSignUp,
  postUserSignIn,
} from '../controllers/users.controller.js';

import { Router } from 'express';

const router = Router();

router.post('/sign-up', postUserSignUp);

router.post('/sign-in', postUserSignIn);

export default router;
