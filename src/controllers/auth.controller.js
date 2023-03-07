import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Logger from '../utils/logger';
import config from '../config';

import UserModel from '../models/user.model';

const logger = Logger('auth.controller.js');

const signUp = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({
      email: req.body.email,
    });

    if (existingUser) {
      res.status(400).send({ status: 'ok', message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const result = await UserModel.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      mobile_no: req.body.mobile_no,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ status: 'ok', message: 'User Created', user: result });
  } catch (error) {
    res.status(400).json({ status: 'error', error: 'Something want wrong.' });
  }
};

const signIn = async (req, res) => {
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
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
      status: 'ok',
      message: 'User Found',
      user: existingUser,
      token,
    });
    return;
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Something Want Wrong.' });
  }
};

const signInUser = async (req, res) => {
  logger.info('Hello There');
  res.status(201).json({ message: 'Hello There' });
};

export default {
  signUp,
  signIn,
  signInUser,
};
