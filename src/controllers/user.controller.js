import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Logger from '../utils/logger';

import UserModel from '../models/user.model';

const logger = Logger('user.controller');

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
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_SECRET_KEY);
    // res.status(201).json({ user: result, token: token });

    res.status(201).json({ user: result });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 'error', error: 'Something want wrong.' });
  }
};

const signIn = async (req, res) => {
  console.log(req.body);
  try {
    const existingUser = await UserModel.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    // Check if the password is correct
    const matchPassword = await bcrypt.compare(req.body.password, existingUser.password);
    if (!matchPassword) {
      return res.status(401).json({ message: 'Authentication failed. Wrong password.' });
    }

    // Create a JWT token with the user ID as the payload
    const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400, // expires in 24 hours
    });

    // Return the token in the response
    return res.status(201).json({ message: 'User Found', user: existingUser, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'error', error: 'Something Want Wrong.' });
  }
};

export default {
  signUp,
  signIn,
};
