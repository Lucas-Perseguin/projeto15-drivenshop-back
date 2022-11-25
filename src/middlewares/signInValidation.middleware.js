import { usersCollection } from "../database/db.js";
import bcrypt from "bcrypt";

export default async function signInValidation(req, res, next) {
  const { email, password } = req.body;

  try {
    const userFound = await usersCollection.findOne({ email });

    if (!userFound || !bcrypt.compareSync(password, userFound.password)) {
      return res.sendStatus(404);
    }

    res.locals.user = userFound;

    next();
  } catch (error) {
    return res.sendStatus(500);
  }
}
