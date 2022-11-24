import { signInSchema } from "../models/signInSchema.js";

export default function signInSchemaValidation(req, res, next) {
  const { error } = signInSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  next();
}
