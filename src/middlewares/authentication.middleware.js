import morgan from 'morgan';
import Logger from '../utils/logger';

const logger = Logger('app');

// Middleware to check for a valid JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed. Token not found.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }
    req.user = payload.user;
    next();
  });
};

export default { authenticateToken };
