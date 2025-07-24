import fetch from 'node-fetch';
import * as dbModel from '../models/product.model.js';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchAllProducts = () => dbModel.getAllProducts();
export const fetchProductById = (id) => dbModel.getProductById(id);
export const createProductInAPI = async (productData) => {
  const id = crypto.randomUUID();
  return dbModel.createProduct(id, productData);
};
export const deleteProductById = (id) => dbModel.deleteProduct(id);
