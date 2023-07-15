import express from 'express';
import { WalletController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

const WalletRouter = express.Router();

WalletRouter.post('/create', AuthMiddleware, WalletController.createWallet);
WalletRouter.post(
  '/razorpay-checkout',
  AuthMiddleware,
  WalletController.razorpayCheckout
);
WalletRouter.post(
  '/verify-payment',
  AuthMiddleware,
  WalletController.verifyPayment
);

WalletRouter.post(
  '/wallet-with-transaction',
  AuthMiddleware,
  WalletController.getWalletWithTr
);

export default WalletRouter;
