import { userSchema } from '../models/userSchema.js';

export default function userSchemaValidation(req, res, next) {
  const { error } = userSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  next();
}
