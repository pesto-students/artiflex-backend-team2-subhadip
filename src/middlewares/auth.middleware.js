import jwt from 'jsonwebtoken';

import Logger from '../utils/logger';
import config from '../config';

const logger = Logger('auth.middleware');

// Middleware to check for a valid JWT token
const AuthMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({
      status: 'error',
      message: 'Authentication failed. Token not found.',
    });
    return;
  }

  jwt.verify(token, config.JWT_SECRET_KEY, (err, payload) => {
    if (err) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication failed. Invalid token.',
      });
      return;
    }
    req.user = payload;
    next();
  });
};

export default AuthMiddleware;
