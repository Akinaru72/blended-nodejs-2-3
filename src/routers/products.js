// src/routers/products.js
import express, { Router } from 'express';
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  patchProductController,
  deleteProductController,
} from '../controllers/products.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

const jsonParser = express.json();

router.get('/', ctrlWrapper(getProductsController));

router.get('/:productId', ctrlWrapper(getProductByIdController));

router.post('/', jsonParser, ctrlWrapper(createProductController));

router.patch('/:productId', jsonParser, ctrlWrapper(patchProductController));

router.delete('/:productId', ctrlWrapper(deleteProductController));

export default router;
