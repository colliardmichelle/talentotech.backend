import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';

const [, , method, path, ...args] = process.argv;

const BASE_URL = 'https://fakestoreapi.com';

async function main() {
  try {
  
    switch (method) {
      case 'GET':
        if (path === 'products') {
          const res = await fetch(`${BASE_URL}/products`);
          const data = await res.json();
          
          
          console.table(data);
          
        } else if (path.startsWith('products/')) {
          const id = path.split('/')[1]; 
          const res = await fetch(`${BASE_URL}/products/${id}`);
          
          if (res.ok) {
            const data = await res.json();
            console.log(JSON.stringify(data, null, 2)); 
          } else {
            console.log(`Producto con ID ${id} no encontrado.`);
          }
        } else {
          console.log('Ruta GET no válida.');
        }
        break;

      case 'POST':
        if (path === 'products') {
          
          const [title, price, category] = args;
          if (!title || !price || !category) {
            console.log('Faltan argumentos: <title> <price> <category>');
            return;
          }

          
          const productoBase = {
            description: "Producto creado desde CLI",
            image: "https://via.placeholder.com/150"
          };

          const nuevoProducto = {
            ...productoBase,
            title,
            price: parseFloat(price),
            category
          };

          const res = await fetch(`${BASE_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto)
          });

          const data = await res.json();
          console.log('✅ Producto creado:', JSON.stringify(data, null, 2));
        } else {
          console.log('Ruta POST no válida.');
        }
        break;

      case 'DELETE':
        if (path.startsWith('products/')) {
          const id = path.split('/')[1]; 
          const res = await fetch(`${BASE_URL}/products/${id}`, {
            method: 'DELETE'
          });
          const data = await res.json();
          console.log('❌ Producto eliminado:', JSON.stringify(data, null, 2));
        } else {
          console.log('Ruta DELETE no válida.');
        }
        break;

      default:
        console.log(`Método ${method} no soportado.`);
    }

  } catch (err) {
    
    console.error("🚨 Error al procesar la solicitud:", err.message);
  }
}


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors()); 
app.use(bodyParser.json()); 


app.get('/', (req, res) => {
  res.send('🟢 API corriendo correctamente.');
});

app.use('/api/products', productRoutes);
app.use('/api/products', productRoutes);
app.use('/auth', authRoutes);


app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
});

// Probado y andando !.