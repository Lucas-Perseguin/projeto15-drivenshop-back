import { ObjectId } from 'mongodb';
import {
  cartscollections,
  productsCollection,
  purchasesCollection,
} from '../database/db.js';

export async function getUserCart(req, res) {
  const { userId } = res.locals;

  try {
    const userCart = await cartscollections.find({ userId }).toArray();
    for (let i = 0; i < userCart.length; i++) {
      const productFound = await productsCollection.findOne({
        _id: new ObjectId(userCart[i].productId),
      });
      userCart[i] = { ...userCart[i], ...productFound };
    }
    res.status(200).send(userCart);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function postProductToCart(req, res) {
  const { productId } = req.params;
  if (!productId) {
    return res.sendStatus(400);
  }

  const { amount } = req.body;
  if (!amount) {
    return res.sendStatus(400);
  }

  const { userId } = res.locals;

  try {
    const productFoud = await cartscollections.findOne({ productId, userId });
    if (!productFoud) {
      await cartscollections.insertOne({ userId, productId, amount });
      return res.sendStatus(201);
    } else {
      const amountToSet = amount + productFoud.amount;
      await cartscollections.updateOne(
        { userId, productId },
        { $set: { amount: amountToSet } }
      );
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function decreaseProductInCart(req, res) {
  const { productId } = req.params;
  if (!productId) {
    return res.sendStatus(400);
  }

  const { userId } = res.locals;

  try {
    const productFoud = await cartscollections.findOne({ productId, userId });
    if (!productFoud) {
      return res.sendStatus(404);
    } else {
      const amountToSet = productFoud.amount - 1;
      await cartscollections.updateOne(
        { userId, productId },
        { $set: { amount: amountToSet } }
      );
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function deleteProductFromUserCart(req, res) {
  const { productId } = req.params;
  if (!productId) {
    return res.sendStatus(400);
  }

  const { userId } = res.locals;

  try {
    const productFoud = await cartscollections.findOne({ productId, userId });
    if (!productFoud) {
      return res.sendStatus(404);
    } else {
      await cartscollections.deleteOne({ userId, productId });
      return res.sendStatus(200);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function deleteUserCart(req, res) {
  const { userId } = res.locals;

  try {
    await cartscollections.deleteMany({ userId });
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function postUserPurchase(req, res) {
  const { userId } = res.locals;
  const purchase = req.body;
  purchase.userId = userId;

  try {
    await purchasesCollection.insertOne({ purchase });
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
}
