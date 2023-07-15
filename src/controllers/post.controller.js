import Joi from 'joi';
import Logger from '../utils/logger';
import { PostService } from '../services';
import { log } from 'winston';

const logger = Logger('post.controller');

const createPost = async (req, res) => {
  try {
    const postSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      post_type: Joi.string().required(),
      post_url: Joi.string(),
      tags: Joi.string().required(),
      for_sell: Joi.string().required(),
      post_price: Joi.string().required(),
    });
    const { error } = postSchema.validate(req.body);

    if (error) {
      res
        .status(500)
        .json({ status: 'error', message: 'Validation error', error });
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
    res
      .status(500)
      .json({ status: 'error', message: 'Error creating post.', error });
  }
};

const updatePost = async (req, res) => {
  try {
    const postSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      post_type: Joi.string().required(),
      post_url: Joi.string(),
      tags: Joi.string().required(),
      for_sell: Joi.string().required(),
      post_price: Joi.string().required(),
    });
    const { error } = postSchema.validate(req.body);

    if (error) {
      res
        .status(500)
        .json({ status: 'error', message: 'Validation error', error });
      return;
    }

    const { user } = req;
    const { id } = req.params.id;

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
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error updating post.',
      error,
    });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await PostService.deletePost({ _id: id });
    res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully.',
      deletedPost,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error deleting post.',
      error,
    });
  }
};

const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const Post = await PostService.getPost({ _id: id });

    if (!Post) {
      res.status(404).json({ status: 'error', message: 'Data not found' });
    }

    res
      .status(200)
      .json({ status: 'success', message: 'Get post successfully.', Post });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fatching post.',
      error,
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const data = req.body;
    const allPosts = await PostService.getAllPostsQuery(data);

    if (!allPosts) {
      res.status(404).json({ status: 'error', message: 'Data not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Get all posts successfully',
      allPosts,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fatching all posts',
      error,
    });
  }
};

const getAllPostsByUserId = async (req, res) => {
  try {
    const data = req.body;
    const allPosts = await PostService.getAllPostsQuery(data);

    if (!allPosts) {
      res.status(404).json({ status: 'error', message: 'Data not found' });
    }
    res.status(200).json({
      status: 'success',
      message: 'Get all posts by user id successfully',
      allPosts,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fatching all posts',
      error,
    });
  }
};

export default {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
  getAllPostsByUserId,
};
