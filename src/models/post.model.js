import { mongoose, Schema } from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    creater_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      allowNull: false,
      required: [true, 'Please enter a valid title'],
    },
    description: {
      type: String,
      allowNull: false,
      required: [true, 'Please enter a valid description'],
    },
    post_url: {
      type: String,
      allowNull: true,
    },
    post_type: {
      type: String,
      allowNull: false,
      required: [true, 'Please enter a valid post type'],
    },
    tags: {
      type: String,
      allowNull: false,
    },
    for_sell: {
      type: Number,
      allowNull: false,
      defaultValue: 0,
      required: [true, 'Please enter a valid for sell data'],
    },
    post_price: {
      type: Number,
      allowNull: false,
      defaultValue: 0,
      required: [true, 'Please enter a valid post price'],
    },
    like: {
      type: Number,
      allowNull: false,
      defaultValue: 0,
      required: [true, 'Please enter a valid like'],
    },
    dislike: {
      type: Number,
      allowNull: false,
      defaultValue: 0,
      required: [true, 'Please enter a valid dislike'],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Post', PostSchema);

export default model;
