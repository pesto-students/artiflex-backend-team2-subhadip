import PostModel from '../models/post.model';
import Logger from '../utils/logger';

const logger = Logger('post.controller');

const createPost = (postData) => PostModel.create(postData);

const updatePost = async (condition, postData) => {
  const updatedPost = await PostModel.findOneAndUpdate(condition, postData);
  return updatedPost;
};

const deletePost = async (id) => {
  const deletedPost = await PostModel.deleteOne({ _id: id });
  return deletedPost;
};

const getPost = async (postData) => {
  const Post = await PostModel.findOne(postData);
  return Post;
};

const getAllPosts = async () => {
  const allPosts = await PostModel.find();
  return allPosts;
};

export default {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
};
