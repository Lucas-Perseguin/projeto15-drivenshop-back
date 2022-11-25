import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient("mongodb+srv://admin:driven@cluster0.dng2bja.mongodb.net/?retryWrites=true&w=majority");

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
export const searchCollection = db.collection("search")
