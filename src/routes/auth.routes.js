import express from 'express';
import { AuthController } from '../controllers';

const AuthRouter = express.Router();

const errorMessage = { message: 'Access Forbidden' };

AuthRouter.post('/signup', AuthController.signUp);
AuthRouter.post('/signin', AuthController.signIn);

AuthRouter.get('*', (req, res) => {
  res.status(404).send(errorMessage);
});

AuthRouter.head('*', (req, res) => {
  res.status(404).send(errorMessage);
});

AuthRouter.post('*', (req, res) => {
  res.status(404).send(errorMessage);
});

AuthRouter.put('*', (req, res) => {
  res.status(404).send(errorMessage);
});

AuthRouter.delete('*', (req, res) => {
  res.status(404).send(errorMessage);
});

AuthRouter.connect('*', (req, res) => {
  res.status(404).send(errorMessage);
});

AuthRouter.options('*', (req, res) => {
  res.status(404).send(errorMessage);
});

AuthRouter.trace('*', (req, res) => {
  res.status(404).send(errorMessage);
});

export default AuthRouter;
