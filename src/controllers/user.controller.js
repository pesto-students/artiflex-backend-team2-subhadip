import Joi from 'joi';
import Logger from '../utils/logger';
import { UserService } from '../services';

const logger = Logger('user.controller');

const createUser = async (req, res) => {
  try {
    const userSchema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      mobile_no: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error } = userSchema.validate(req.body);

    if (error) {
      res.status(500).json({ status: 'error', error });
      return;
    }

    const newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      mobile_no: req.body.mobile_no,
      password: req.body.password,
    };
    const user = await UserService.createUser(newUser);
    res
      .status(201)
      .json({ status: 'success', message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ status: 'error', error });
  }
};

const updateUser = async (req, res) => {
  try {
    const userSchema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      mobile_no: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error } = userSchema.validate(req.body);

    if (error) {
      res.status(500).json({ status: 'error', error });
      return;
    }

    const id = req.params.id;

    const updateUserData = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      mobile_no: req.body.mobile_no,
      password: req.body.password,
    };

    const updatedPost = await UserService.updateUser(
      { _id: id },
      { $set: updateUserData }
    );
    res.status(200).json({
      status: 'success',
      message: 'User updated successfully.',
      post: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      status: 'success',
      message: 'Error updating post.',
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await UserService.deleteUser({ _id: id });
    res.status(200).json({
      status: 'success',
      message: 'User deleted successfully.',
      deletedUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error deleting user.', error: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const User = await UserService.getUser({ _id: id });
    res
      .status(200)
      .json({ status: 'success', message: 'Get user successfully.', User });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error fatching user.',
      error: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserService.getAllUsers();
    res
      .status(200)
      .json({ status: 'success', message: 'Get all successfully.', allUsers });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error fatching all users.',
      error: err.message,
    });
  }
};

export default {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
};
