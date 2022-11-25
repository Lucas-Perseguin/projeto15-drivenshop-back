import { ObjectId } from 'mongodb';
import { productsCollection } from '../database/db.js';

export async function getProducts(req, res) {
  try {
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function getProductById(req, res) {
  const { productId } = req.params;

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

export async function getProductsByType(req, res) {
  const { productType } = req.params;
  if (!productType) return res.sendStatus(400);
  try {
    const products = await productsCollection
      .find({ type: productType })
      .toArray();

    if (!products) return res.sendStatus(404);

    return res.status(200).send(products);
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function getProductsByTypeOnSale(req, res) {
  const { productType } = req.params;

  if (!productType) return res.sendStatus(400);

  try {
    const products = await productsCollection
      .find({ type: productType, sale: true })
      .toArray();
    if (!products) return res.sendStatus(404);
    return res.status(200).send(products);
  } catch (err) {
    return res.sendStatus(500);
  }
}
