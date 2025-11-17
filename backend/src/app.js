import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { securityMiddleware, authLimiter, apiLimiter } from './middleware/security.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS CONFIG - IMPORTANTE!
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middlewares
app.use(express.json({ limit: '10kb' }));
app.use(securityMiddleware);

// Rate limiting
app.use('/api/login', authLimiter);
app.use('/api/register', authLimiter);
app.use('/api', apiLimiter);

// Rotas
app.use('/api', authRoutes);

// Health check - PARA TESTAR
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend funcionando!',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌐 CORS habilitado para: http://localhost:3000`);
});