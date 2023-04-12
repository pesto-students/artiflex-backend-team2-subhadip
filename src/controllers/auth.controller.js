import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import Logger from '../utils/logger';
import config from '../config';

import UserModel from '../models/user.model';

import { UserService } from '../services';
import userController from './user.controller';
import userService from '../services/user.service';

const logger = Logger('auth.controller.js');

const signUp = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      res
        .status(400)
        .send({ status: 'success', message: 'User already exists' });
    } else {
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

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile_no: req.body.mobile_no,
        password: hashedPassword,
      };

      const result = await UserService.createUser(newUser);

      res
        .status(201)
        .json({ status: 'success', message: 'User Created', user: result });
    }
  } catch (error) {
    res.status(400).json({ status: 'error', error: 'Something want wrong.' });
  }
};

const signIn = async (req, res) => {
  try {
    const existingUser = await userService.getUser({
      email: req.body.email,
    });

    if (!existingUser) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication failed. User not found.',
      });
      return;
    }

    // Check if the password is correct
    const matchPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!matchPassword) {
      res.status(401).json({
        status: 'error',
        message: 'Authentication failed. Wrong password.',
      });
      return;
    }

    // Create a JWT token with the user ID as the payload
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      config.JWT_SECRET_KEY,
      {
        expiresIn: 86400, // expires in 24 hours
      }
    );

    // Return the token in the response
    res.status(201).send({
      status: 'success',
      message: 'User Found',
      // user: existingUser,
      token,
    });
    return;
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Something Want Wrong.' });
  }
};

export default {
  signUp,
  signIn,
};
