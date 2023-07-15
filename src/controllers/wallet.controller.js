import Joi from 'joi';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Logger from '../utils/logger';
import config from '../config';
import { WalletService, TokenTransactionService } from '../services';

const logger = Logger('wallet.controller');

const createWallet = async (req, res) => {
  try {
    const walletSchema = Joi.object({
      tokens: Joi.number().required(),
    });
    const { error } = walletSchema.validate(req.body);

    if (error) {
      res.status(500).json({ status: 'error', error });
      return;
    }

    const { user } = req;
    const createWalletData = {
      user_id: user.id,
      tokens: req.body.tokens,
    };
    const wallet = await WalletService.createWallet(createWalletData);
    res.status(201).json({
      status: 'success',
      message: 'Wallet created successfully.',
      wallet,
    });
  } catch (error) {
    res.status(500).json({ status: 'error', error });
  }
};

const razorpayCheckout = async (req, res) => {
  const data = req.body;

  const instance = new Razorpay({
    key_id: config.RAZERPAY_KEY_ID,
    key_secret: config.RAZERPAY_SECRET_KEY,
  });

  const options = {
    amount: data.amount * 100,
    currency: 'INR',
    receipt: 'order_rcptid_11',
  };

  instance.orders.create(options, function (err, order) {
    if (err) {
      res.status(500).json({
        status: 'error',
        message: 'razerpay error',
        err,
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Checkout link created.',
      data: order,
    });
  });
};

const verifyPayment = async (req, res) => {
  const body = `${req.body.response.razorpay_order_id}|${req.body.response.razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac('sha256', config.RAZERPAY_SECRET_KEY)
    .update(body.toString())
    .digest('hex');

  if (expectedSignature === req.body.response.razorpay_signature) {
    res.status(200).json({
      status: 'success',
      message: 'Sign Valid.',
      paymentStatus: true,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Sign Invalid.',
      paymentStatus: false,
    });
  }
};

const getWalletWithTr = async (req, res) => {
  const data = req.body;
  const userData = JSON.parse(data.userData);
  const { tokens } = await WalletService.getWallet({ user_id: userData._id });
  const userTransactions = await TokenTransactionService.getAllTransactions({
    user_id: userData._id,
  });

  const userWithTr = {
    user_tokens: tokens,
    user_transactions: userTransactions,
  };

  res.status(200).json({
    status: 'success',
    message: 'Get all transactions with tocken successfully',
    userWithTr,
  });
};

export default {
  createWallet,
  razorpayCheckout,
  verifyPayment,
  getWalletWithTr,
};
