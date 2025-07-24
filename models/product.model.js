import { db } from './firebase.js';
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';

const productCollection = collection(db, 'products');

export const getAllProducts = async () => {
  const snapshot = await getDocs(productCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getProductById = async (id) => {
  const ref = doc(db, 'products', id);
  const snapshot = await getDoc(ref);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const createProduct = async (id, product) => {
  const ref = doc(db, 'products', id);
  await setDoc(ref, product);
  return { id, ...product };
};

export const deleteProduct = async (id) => {
  const ref = doc(db, 'products', id);
  await deleteDoc(ref);
  return { id, deleted: true };
};
