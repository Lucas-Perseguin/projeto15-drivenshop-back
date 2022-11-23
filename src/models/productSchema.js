import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  sale: Joi.boolean().required(),
  image: Joi.string().required(),
  type: Joi.string().valid('smartphone', 'notebook', 'peripheral'),
  brand: Joi.string().required(),
  stars: Joi.number().required(),
});
