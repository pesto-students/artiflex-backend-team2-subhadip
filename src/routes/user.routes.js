import express from 'express';
import { UserController } from '../controllers';

import { AuthMiddleware } from '../middlewares';

const UserRouter = express.Router();

const errorMessage = { message: 'Access Forbidden' };

UserRouter.post('/signup', UserController.signUp);
UserRouter.post('/signin', UserController.signIn);
UserRouter.post('/user', AuthMiddleware, UserController.signInUser);

UserRouter.get('*', (req, res) => {
  res.status(404).send(errorMessage);
});

UserRouter.head('*', (req, res) => {
  res.status(404).send(errorMessage);
});

UserRouter.post('*', (req, res) => {
  res.status(404).send(errorMessage);
});

UserRouter.put('*', (req, res) => {
  res.status(404).send(errorMessage);
});

UserRouter.delete('*', (req, res) => {
  res.status(404).send(errorMessage);
});

UserRouter.connect('*', (req, res) => {
  res.status(404).send(errorMessage);
});

UserRouter.options('*', (req, res) => {
  res.status(404).send(errorMessage);
});

UserRouter.trace('*', (req, res) => {
  res.status(404).send(errorMessage);
});

export default UserRouter;
