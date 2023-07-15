import TokenTransactionModel from '../models/token_transaction.model';
import Logger from '../utils/logger';

const logger = Logger('tokenTransaction.service');

const createTransaction = (transactionData) =>
  TokenTransactionModel.create(transactionData);

const getAllTransactions = async (condition) => {
  const allTransactions = await TokenTransactionModel.find(condition).populate([
    { path: 'user_id', select: '-password' },
  ]);
  return allTransactions;
};

export default {
  createTransaction,
  getAllTransactions,
};
