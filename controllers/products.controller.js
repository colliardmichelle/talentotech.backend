import {
  fetchAllProducts,
  fetchProductById,
  createProductInAPI,
  deleteProductById,
} from '../services/products.service.js';

export const getAllProducts = async (req, res) => {
  try {
    const data = await fetchAllProducts();
    res.json(data);
  } catch {
    res.status(500).json({ error: 'Error al obtener productos.' });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await fetchProductById(id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado.' });
    res.json(product);
  } catch {
    res.status(500).json({ error: 'Error al buscar producto.' });
  }
};

export const createProduct = async (req, res) => {
  const { title, price, category, description, image } = req.body;
  try {
    const product = await createProductInAPI({ title, price, category, description, image });
    res.status(201).json(product);
  } catch {
    res.status(500).json({ error: 'Error al crear producto.' });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteProductById(id);
    res.json({ message: 'Producto eliminado', result });
  } catch {
    res.status(500).json({ error: 'Error al eliminar producto.' });
  }
};
