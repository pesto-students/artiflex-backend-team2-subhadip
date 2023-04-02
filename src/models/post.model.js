import { mongoose, Schema } from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    creater_id: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, allowNull: true },
    description: { type: String, allowNull: true },
    post_url: { type: String, allowNull: true },
    post_type: { type: String, allowNull: false },
    tags: { type: String, allowNull: false },
    for_sell: { type: Number, allowNull: false, defaultValue: 0 },
    post_price: { type: Number, allowNull: false, defaultValue: 0 },
    like: { type: Number, allowNull: false, defaultValue: 0 },
    dislike: { type: Number, allowNull: false, defaultValue: 0 },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Post', PostSchema);

export default model;
