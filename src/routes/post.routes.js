import express from 'express';
import { PostController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

const PostRouter = express.Router();

PostRouter.post('/create', AuthMiddleware, PostController.createPost);
PostRouter.put('/update/:id', AuthMiddleware, PostController.updatePost);
PostRouter.delete('/delete/:id', AuthMiddleware, PostController.deletePost);
PostRouter.get('/posts', AuthMiddleware, PostController.getAllPosts);
PostRouter.get('/post/:id', AuthMiddleware, PostController.getPost);
PostRouter.post(
  '/posts/byuserid',
  AuthMiddleware,
  PostController.getAllPostsByUserId
);

export default PostRouter;
