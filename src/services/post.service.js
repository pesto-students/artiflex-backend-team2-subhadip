import PostModel from '../models/post.model';
import Logger from '../utils/logger';

const logger = Logger('post.service');

const createPost = (postData) => PostModel.create(postData);

const updatePost = async (condition, postData) => {
  const updatedPost = await PostModel.findOneAndUpdate(condition, postData);
  return updatedPost;
};

const deletedPost = async (condition) => {
  console.log(condition);
  const deletedPost = await PostModel.deleteOne(condition);
  return deletedPost;
};

const getPost = async (postData) => {
  const Post = await PostModel.findOne(postData).populate([
    { path: 'user_id', select: '-password' },
    { path: 'creater_id', select: '-password' },
  ]);
  return Post;
};

const getAllPosts = async () => {
  const allPosts = await PostModel.find().populate([
    { path: 'user_id', select: '-password' },
    { path: 'creater_id', select: '-password' },
  ]);
  return allPosts;
};

export default {
  createPost,
  updatePost,
  deletedPost,
  getPost,
  getAllPosts,
};
