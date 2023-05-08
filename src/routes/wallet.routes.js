import express from 'express';
import { WalletController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

const WalletRouter = express.Router();

WalletRouter.post('/create', AuthMiddleware, WalletController.createWallet);

export default WalletRouter;
