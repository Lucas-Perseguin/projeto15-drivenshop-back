import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
  await mongoClient.connect();
  console.log('MongoDB conectado!');
} catch (err) {
  console.log(err);
}

const db = mongoClient.db('projeto15');
export const usersCollection = db.collection('users');
export const productsCollection = db.collection('products');
export const cartscollections = db.collection('carts');
export const searchCollection = db.collection('search');
