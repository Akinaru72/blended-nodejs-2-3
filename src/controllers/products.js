// src/controllers/products.js

import createHttpError from 'http-errors';
import mongoose from 'mongoose';

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../services/products.js';

export const getProductsController = async (req, res) => {
  const products = await getAllProducts();
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: products,
  });
};

export const getProductByIdController = async (req, res) => {
  const { productId } = req.params;
  const product = await getProductById(productId);
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: `Successfully found Product with id ${productId}!`,
    data: product,
  });
};

export const createProductController = async (req, res) => {
  const product = await createProduct(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created product!',
    data: product,
  });
};

export const patchProductController = async (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw createHttpError(400, 'Invalid product ID');
  }

  const result = await updateProduct(productId, req.body);

  if (result === null) {
    throw new createHttpError.NotFound('Product not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a product!',
    data: result.product,
  });
};

export const deleteProductController = async (req, res) => {
  const { productId } = req.params;
  const product = await deleteProduct(productId);
  if (!product) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 204,
    message: `Successfully delete product with id ${productId}!`,
    data: product,
  });
};
