import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import busArrivalHandler from './api/bus-arrival.js';
import healthHandler from './api/health.js';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// API Routes
app.all('/api/health', (req, res) => healthHandler(req, res));
app.all('/api/health.js', (req, res) => healthHandler(req, res));

app.all('/api/bus-arrival', (req, res) => busArrivalHandler(req, res));
app.all('/api/bus-arrival.js', (req, res) => busArrivalHandler(req, res));

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve('dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve('dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SBS Transit Server] Listening on http://0.0.0.0:${PORT}`);
    console.log(`[SBS Transit Server] Health endpoint: http://localhost:${PORT}/api/health`);
    console.log(`[SBS Transit Server] Bus arrival endpoint: http://localhost:${PORT}/api/bus-arrival?BusStopCode=76081&ServiceNo=20`);
  });
}

startServer();
