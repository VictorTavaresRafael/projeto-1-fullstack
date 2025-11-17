import express from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { 
  validateRegistration, 
  validateLogin, 
  handleValidationErrors 
} from '../middleware/validation.js';
import { authenticateToken } from '../middleware/auth.js';
import { securityLogger } from '../utils/logger.js';

const router = express.Router();

// POST /api/register - Registro de usuário
router.post('/register', 
  validateRegistration, 
  handleValidationErrors,
  async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const user = await User.create({ name, email, password });
      
      // Log de registro bem-sucedido
      securityLogger.dataAccess(user.id, 'register', 'user');

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });

    } catch (error) {
      // Log de erro no registro
      securityLogger.loginAttempt(req.body.email, false, req.ip);
      
      if (error.message === 'Email já cadastrado') {
        return res.status(409).json({ error: error.message });
      }
      
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
);

// POST /api/login - Login
router.post('/login',
  validateLogin,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findByEmail(email);
      
      if (!user || !(await User.comparePassword(password, user.password))) {
        // Log de tentativa de login falha
        securityLogger.loginAttempt(email, false, req.ip);
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      // Log de login bem-sucedido
      securityLogger.loginAttempt(email, true, req.ip);

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login realizado com sucesso',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });

    } catch (error) {
      securityLogger.loginAttempt(req.body.email, false, req.ip);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
);

// GET /api/profile - Buscar dados do usuário (protegido)
router.get('/profile', authenticateToken, (req, res) => {
  // Log de acesso a dados sensíveis
  securityLogger.dataAccess(req.user.id, 'read', 'profile');
  
  res.json({
    user: req.user
  });
});

// GET /api/users - Buscar todos usuários (protegido)
router.get('/users', authenticateToken, async (req, res) => {
  try {
    // Log de busca
    securityLogger.dataAccess(req.user.id, 'search', 'users');
    
    // Implementar busca paginada aqui
    res.json({ 
      message: 'Endpoint de busca de usuários',
      user: req.user 
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro na busca' });
  }
});

export default router;