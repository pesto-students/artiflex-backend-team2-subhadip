import express from 'express';
import { UserController } from '../controllers';

const UserRouter = express.Router();

UserRouter.post('/signup', UserController.signUp);
UserRouter.get('/signin', UserController.signIn);

export default UserRouter;
