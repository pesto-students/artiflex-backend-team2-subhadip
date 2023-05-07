import express from 'express';
import { UserController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

const UserRouter = express.Router();

UserRouter.post('/create', AuthMiddleware, UserController.createUser);
UserRouter.put('/update/:id', AuthMiddleware, UserController.updateUser);
UserRouter.delete('/delete/:id', AuthMiddleware, UserController.deleteUser);
UserRouter.get('/users', AuthMiddleware, UserController.getAllUsers);
UserRouter.get('/user/:id', AuthMiddleware, UserController.getUser);

export default UserRouter;
