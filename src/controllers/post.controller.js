import { PostService } from '../services';
import Logger from '../utils/logger';
import postService from '../services/post.service';

const logger = Logger('post.controller');

const createPost = async (req, res) => {
  try {
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
    res.status(201).json(post);
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
    res
      .status(200)
      .json({ message: 'Post Updated Successfully', post: updatedPost });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error Updating Post', error: err.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await PostService.updatePost({ _id: id });
    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error Deleting Post', error: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await postService.getAllPosts();
    res.status(200).json({ message: 'Get all successfully', allPosts });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error Fatching All Post', error: err.message });
  }
};

export default {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
};
