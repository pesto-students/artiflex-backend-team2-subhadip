import Joi from 'joi';
import Logger from '../utils/logger';
import { WalletService } from '../services';

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

export default {
  createWallet,
};
