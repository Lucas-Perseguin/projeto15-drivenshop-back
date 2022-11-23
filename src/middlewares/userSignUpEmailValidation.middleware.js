import { usersCollection } from '../database/db.js';

export default async function userSignUpEmailValidation(req, res, next) {
  const { email } = req.body;
  try {
    const userFound = await usersCollection.findOne({ email });

    if (userFound) {
      return res.sendStatus(409);
    }

    next();
  } catch (error) {
    return res.sendStatus(500);
  }
}
