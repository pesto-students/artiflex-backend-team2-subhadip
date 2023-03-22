import PostModel from '../models/post.model';

import Logger from '../utils/logger';

const logger = Logger('post.controller');

const createPost = async (req, res) => {
  try {
    const { user } = req;
    const newPost = await new PostModel({
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
    });
    const post = await newPost.save();
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

    const updatedPost = await PostModel.findOneAndUpdate(
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
    const deletedPost = await PostModel.deleteOne({ _id: id });
    res.status(200).json({ message: 'Post deleted successfully', deletedPost });
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error Deleting Post', error: err.message });
  }
};

export default {
  createPost,
  updatePost,
  deletePost,
};
