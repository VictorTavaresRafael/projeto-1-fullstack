import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// Log no console em desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Funções específicas para segurança
export const securityLogger = {
  loginAttempt: (email, success, ip) => {
    logger.warn('Tentativa de login', { 
      email, 
      success, 
      ip,
      timestamp: new Date().toISOString()
    });
  },
  
  dataAccess: (userId, action, resource) => {
    logger.info('Acesso a dados', {
      userId,
      action,
      resource,
      timestamp: new Date().toISOString()
    });
  }
};