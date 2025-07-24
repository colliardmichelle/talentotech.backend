import jwt from 'jsonwebtoken';

const USERS = [
  { email: 'admin@empresa.com', password: '123456' }
];

export const validateCredentials = (email, password) => {
  return USERS.find(u => u.email === email && u.password === password);
};

export const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};
