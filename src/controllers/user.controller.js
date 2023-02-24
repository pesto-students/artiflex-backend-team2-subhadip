import Logger from '../utils/logger';

import User from '../models/user.model'

const logger = Logger('user.controller');

const signUp = async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.status(200).send({ status: 'ok', message: 'User Created' });
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 'error', error: 'Duplicate email' });
  }
};

const signIn = async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })

    if (user) {
      return res.json({ status: 'ok', user: true });
    } else {
      return res.json({ status: 'error', user: true });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ status: 'error', error: 'Duplicate email' });
  }
};

export default {
  signUp,
  signIn,
};
