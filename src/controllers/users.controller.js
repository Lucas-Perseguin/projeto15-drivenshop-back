import { usersCollection } from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';

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
    const token = jwt.sign(
      { id: createdUser.insertedId },
      process.env.SECRET_JWT,
      {
        expiresIn: 86400,
      }
    );
    res.status(201).send(token);
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function postUserSignIn(req, res) {
  const { _id } = res.locals.user;
  try {
    const token = jwt.sign({ id: _id }, process.env.SECRET_JWT, {
      expiresIn: 86400,
    });
    res.status(201).send({ token });
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function getIsToken(req, res) {
  return res.sendStatus(200);
}

export async function getUserById(req, res) {
  const { userId } = res.locals;

  try {
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
    res.status(200).send(user);
  } catch (err) {
    res.sendStatus(500);
  }
}
