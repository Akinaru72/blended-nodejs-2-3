// src/services/products.js
import { ProductsCollection } from '../db/models/product.js';

export const getAllProducts = async () => {
  const products = await ProductsCollection.find();
  return products;
};

export const getProductById = async (productId) => {
  const product = await ProductsCollection.findById(productId);
  return product;
};

export const createProduct = async (payload) => {
  const product = await ProductsCollection.create(payload);
  return product;
};

export const updateProduct = async (productId, payload, options = {}) => {
  const product = await ProductsCollection.findByIdAndUpdate(
    productId,
    payload,
    {
      new: true,
      runValidators: true,
      ...options,
    },
  );

  if (!product) return null;

  return {
    product,
    isNew: false,
  };
};

export const deleteProduct = async (productId) => {
  const product = await ProductsCollection.findOneAndDelete({
    _id: productId,
  });
  return product;
};
