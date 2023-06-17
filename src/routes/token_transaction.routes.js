import express from 'express';
import { TokenTransactionController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

const TokenTransactionRouter = express.Router();

TokenTransactionRouter.post(
  '/create',
  AuthMiddleware,
  TokenTransactionController.createTransaction
);

export default TokenTransactionRouter;
