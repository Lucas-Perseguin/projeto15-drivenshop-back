import { ObjectId } from "mongodb";
import { usersCollection } from "../database/db.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default async function jwtValidation(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: "The token was not informed!" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send({ message: "Invalid token!" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: "Malformatted Token!" });
  }

  jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).send({ message: "Invalid token!" });
    }

    const user = await usersCollection.findOne({
      _id: new ObjectId(decoded.id),
    });

    if (!user || !user._id) {
      return res.status(401).send({ message: "Invalid token!" });
    }

    res.locals.userId = user._id;

    return next();
  });
}
