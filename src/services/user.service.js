import UserModel from '../models/user.model';
import Logger from '../utils/logger';

const logger = Logger('user.controller');

const createUser = (userData) => UserModel.create(userData);

const updateUser = async (condition, userData) => {
  const updatedUser = await UserModel.findOneAndUpdate(condition, userData);
  return updatedUser;
};

const deleteUser = async (condition) => {
  const deletedUser = await UserModel.deleteOne(condition);
  return deletedUser;
};

const getUser = async (userData) => {
  const User = await UserModel.findOne(userData);
  return User;
};

const getAllUsers = async () => {
  const allUsers = await UserModel.find();
  return allUsers;
};

export default {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
};
