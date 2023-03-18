import express from 'express';
import { PostController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

const PostRouter = express.Router();

PostRouter.post('/create', AuthMiddleware, PostController.createPost);

export default PostRouter;
