import WalletModel from '../models/wallet.model';
import Logger from '../utils/logger';

const logger = Logger('wallet.service');

const createWallet = (walletData) => WalletModel.create(walletData);

const getWallet = async (walletData) => {
  const Wallet = await WalletModel.findOne(walletData).populate([
    { path: 'user_id', select: '-password' },
  ]);
  return Wallet;
};

const updateWallet = async (condition, walletData) => {
  const updatedWallet = await WalletModel.findOneAndUpdate(
    condition,
    walletData
  );
  const updateData = await getWallet(condition);
  return updateData;
};

const deleteWallet = async (condition) => {
  const deletedWallet = await WalletModel.deleteOne(condition);
  return deletedWallet;
};

export default {
  createWallet,
  updateWallet,
  deleteWallet,
  getWallet,
};
