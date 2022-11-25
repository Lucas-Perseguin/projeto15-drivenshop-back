import { ObjectId } from 'mongodb';
import { productsCollection, searchCollection } from '../database/db.js';

export async function getProducts(req, res) {
  const productName = req.query.name;    

  try {
    const searchProducts = await searchCollection.find().toArray();
    const products = await productsCollection.find().toArray()
    if (!productName) {       
      return res.status(200).send(products);       
  }
    searchProducts.splice(0, 60);
    for(let i = 0; i < products.length;i++){
      const product = products[i];
      if(product.name.toLowerCase().includes(productName.toLowerCase())){
        searchProducts.push(product)
      }
    }    
    if (searchProducts.length === 0) {
      return res.send("Produto não encontrado");
    }    
     return res.status(200).send(searchProducts); 
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
