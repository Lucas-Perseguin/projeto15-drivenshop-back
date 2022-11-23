import { usersCollection } from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function postUserSignUp(req, res) {
  const { email, cpf, name, password } = req.body;
  try {
    const hashPassword = bcrypt.hashSync(password, 12);
    const createdUser = await usersCollection.insertOne({
      email,
      name,
      cpf,
      password: hashPassword,
    });
    const token = jwt.sign({ id: createdUser._id }, process.env.SECRET_JWT, {
      expiresIn: 86400,
    });
    res.status(201).send({ token });
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function postUserSignIn(req, res) {
  try {
  } catch (err) {
    res.sendStatus(500);
  }
}
