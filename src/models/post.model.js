import { mongoose, Schema } from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      allowNull: false,
      required: [true, 'Please enter a valid user id'],
    },
    creater_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      allowNull: false,
      required: [true, 'Please enter a valid user id'],
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
      allowNull: false,
      default: '',
    },
    post_type: {
      type: String,
      allowNull: false,
      required: [true, 'Please enter a valid post type'],
    },
    tags: {
      type: String,
      allowNull: false,
      default: '',
      required: [true, 'Please enter a valid tags'],
    },
    for_sell: {
      type: Number,
      allowNull: false,
      required: [true, 'Please enter a valid for sell'],
      default: 0,
    },
    post_price: {
      type: Number,
      allowNull: false,
      required: [true, 'Please enter a valid post price'],
      default: 0,
    },
    like: {
      type: Number,
      allowNull: false,
      required: [true, 'Please enter a valid like'],
      default: 0,
    },
    dislike: {
      type: Number,
      allowNull: false,
      required: [true, 'Please enter a valid dislike'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Post', PostSchema);

export default model;
