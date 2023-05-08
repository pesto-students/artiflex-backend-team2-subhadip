import WalletModel from '../models/wallet.model';
import Logger from '../utils/logger';

const logger = Logger('wallet.service');

const createWallet = (walletData) => WalletModel.create(walletData);

const updateWallet = async (condition, walletData) => {
  const updatedWallet = await WalletModel.findOneAndUpdate(
    condition,
    walletData
  );
  return updatedWallet;
};

const deleteWallet = async (condition) => {
  const deletedWallet = await WalletModel.deleteOne(condition);
  return deletedWallet;
};

const getWallet = async (walletData) => {
  const Wallet = await WalletModel.findOne(walletData).populate([
    { path: 'user_id', select: '-password' },
  ]);
  return Wallet;
};

export default {
  createWallet,
  updateWallet,
  deleteWallet,
  getWallet,
};
