import { validateCredentials, generateToken } from '../services/auth.service.js';

export const loginUser = (req, res) => {
  const { email, password } = req.body;
  const user = validateCredentials(email, password);

  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = generateToken(email);
  res.json({ token });
};
