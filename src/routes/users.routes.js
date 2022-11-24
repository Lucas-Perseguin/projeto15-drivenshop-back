import {
  postUserSignUp,
  postUserSignIn,
  getIsToken,
} from "../controllers/users.controller.js";

import userSchemaValidation from "../middlewares/userSchemaValidation.middleware.js";
import userSignUpEmailValidation from "../middlewares/userSignUpEmailValidation.middleware.js";

import { Router } from "express";
import signInSchemaValidation from "../middlewares/signInSchemaValidation.middleware.js";
import signInValidation from "../middlewares/signInValidation.middleware.js";
import jwtValidation from "../middlewares/jwtValidation.middleware.js";

const router = Router();

router.post(
  "/sign-up",
  userSchemaValidation,
  userSignUpEmailValidation,
  postUserSignUp
);

router.post(
  "/sign-in",
  signInSchemaValidation,
  signInValidation,
  postUserSignIn
);

router.get("/token", jwtValidation, getIsToken);

export default router;
