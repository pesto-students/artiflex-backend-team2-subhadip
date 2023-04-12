import Joi from 'joi';
import Logger from '../utils/logger';
import { PostService } from '../services';

const logger = Logger('post.controller');

const createPost = async (req, res) => {
  try {
    const postSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      post_url: Joi.string().required(),
      post_type: Joi.string().required(),
      tags: Joi.string().required(),
      for_sell: Joi.number().required(),
      post_price: Joi.number().required(),
    });
    const { error } = postSchema.validate(req.body);

    if (error) {
      res.status(500).json({ status: 'error', error });
      return;
    }

    const { user } = req;
    const newPost = {
      user_id: user.id,
      creater_id: user.id,
      title: req.body.title,
      description: req.body.description,
      post_url: req.body.post_url,
      post_type: req.body.post_type,
      tags: req.body.tags,
      for_sell: req.body.for_sell,
      post_price: req.body.post_price,
      like: req.body.like,
      dislike: req.body.dislike,
    };
    const post = await PostService.createPost(newPost);
    res
      .status(201)
      .json({ status: 'success', message: 'Post created successfully.', post });
  } catch (error) {
    res.status(500).json({ status: 'error', error });
  }
};

const updatePost = async (req, res) => {
  try {
    const { user } = req;
    const id = req.params.id;

    const updatePostData = {
      user_id: user.id,
      creater_id: user.id,
      title: req.body.title,
      description: req.body.description,
      post_type: req.body.post_type,
      tags: req.body.tags,
      for_sell: req.body.for_sell,
      post_price: req.body.post_price,
      like: req.body.like,
      dislike: req.body.dislike,
    };

    const updatedPost = await PostService.updatePost(
      { _id: id },
      { $set: updatePostData }
    );
    res.status(200).json({
      status: 'success',
      message: 'Post updated successfully.',
      post: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating post.',
      error: err.message,
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await PostService.updatePost({ _id: id });
    res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully.',
      deletedPost,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting post.',
      error: err.message,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await PostService.getAllPosts();
    res.status(200).json({
      status: 'success',
      message: 'Get all posts successfully',
      allPosts,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error fatching all posts',
      error: err.message,
    });
  }
};

export default {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
};
