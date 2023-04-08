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
    res.status(201).json({ message: 'Uer created successfully', user });
  } catch (error) {
    res.status(500).json({ status: 'error', error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { user } = req;
    const id = req.params.id;

    const updateUserData = {
      user_id: user.id,
      creater_id: user.id,
      title: req.body.title,
      description: req.body.description,
      post_type: req.body.post_type,
      tags: req.body.tags,
      for_sell: req.body.for_sell,
      post_price: req.body.post_price,
      like: req.body.like,
      dislike: req.body.dislike,
    };

    const updatedPost = await PostService.updateUser(
      { _id: id },
      { $set: updateUserData }
    );
    res
      .status(200)
      .json({ message: 'Post Updated Successfully', post: updatedPost });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error Updating Post', error: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserService.getAllUsers();
    res.status(200).json({ message: 'Get all successfully', allUsers });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error Fatching All Post', error: err.message });
  }
};

export default { createUser, updateUser, getAllUsers };
