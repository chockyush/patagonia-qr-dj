import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupSocket } from './socket';
import { searchTracks } from './spotify';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Endpoint para buscar canciones
app.get('/api/search', async (req, res) => {
  const query = req.query.q as string;
  console.log('🔍 Petición de búsqueda recibida:', query);
  if (!query) return res.status(400).json({ error: 'Falta el parámetro de búsqueda' });

  const results = await searchTracks(query);
  console.log('✅ Enviando resultados:', results.length);
  res.json(results);
});

// Setup de WebSockets
setupSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
