import { ObjectId } from 'mongodb';
import { productsCollection } from '../database/db.js';

export async function getProducts(req, res) {
  try {
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function getProductById(req, res) {
  const { productId } = req.query;

  if (!productId) {
    return res.sendStatus(400);
  }

  try {
    const productFound = await productsCollection.findOne({
      _id: new ObjectId(productId),
    });

    if (!productFound) {
      return res.sendStatus(404);
    }

    res.status(200).send(productFound);
  } catch (err) {
    res.sendStatus(500);
  }
}
