import express from 'express';
import usersRouter from './routes/users.routes.js';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import cors from 'cors';
import dotenv from 'dotenv';

//config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(usersRouter);
app.use(productsRouter);
app.use(cartsRouter);

//turn server on
app.listen(process.env.PORT);
