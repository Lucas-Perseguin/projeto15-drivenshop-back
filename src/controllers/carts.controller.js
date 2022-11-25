import { cartscollections } from '../database/db.js';

export async function postProductToCart(req, res) {
  const { productId } = req.query;
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

export async function decreaseProductInCart() {
  const { productId } = req.query;
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

export async function deleteProductFromUserCart() {
  try {
  } catch (error) {
    return res.sendStatus(500);
  }
}

export async function deleteUserCart() {
  try {
  } catch (error) {
    return res.sendStatus(500);
  }
}