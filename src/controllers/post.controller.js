import PostModel from '../models/post.model';

import Logger from '../utils/logger';

const logger = Logger('post.controller');

const createPost = async (req, res) => {
  try {
    const { user } = req;
    const newPost = await new PostModel({
      user_id: user.id,
      creater_id: user.id,
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

export default {
  createPost,
};
