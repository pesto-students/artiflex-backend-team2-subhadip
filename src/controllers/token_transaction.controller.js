import Logger from '../utils/logger';
import { TokenTransactionService } from '../services';
import { WalletService } from '../services';

const logger = Logger('token_transaction.controller');

const createTransaction = async (req, res) => {
  const response = req.body;
  const razerpayTrData = response.response;
  const userData = JSON.parse(response.userData);

  const transactionData = {
    user_id: userData._id,
    transaction_process: 'credit',
    token_number: response.token,
    razorpay_transaction_id: razerpayTrData.razorpay_payment_id,
  };

  const transaction = await TokenTransactionService.createTransaction(
    transactionData
  );

  if (transaction) {
    const userWallet = await WalletService.getWallet({
      user_id: userData._id,
    });

    const walletUpdateData = {
      tokens: parseFloat(userWallet.tokens) + parseFloat(response.token),
    };

    const walletUpdate = await WalletService.updateWallet(
      {
        _id: userWallet._id,
      },
      { $set: walletUpdateData }
    );
    console.log(walletUpdate);

    res.status(201).json({
      status: 'success',
      message: 'Token transaction created successfully.',
      transaction,
    });
  } else {
    res
      .status(500)
      .json({ status: 'error', message: 'Error creating token transaction.' });
  }
};

const getAllTransaction = async (req, res) => {
  try {
    const allTransactions =
      await TokenTransactionService.getAllTraallTransactions();
    if (!allTransactions) {
      res.status(404).json({ status: 'error', message: 'Data not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Get all transactions successfully',
      allTransactions,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fatching all transactions',
      error,
    });
  }
};

export default {
  createTransaction,
  getAllTransaction,
};
