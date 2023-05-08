import { mongoose, Schema } from 'mongoose';

const WalletSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      allowNull: false,
      required: [true, 'Please enter a valid user id'],
    },
    tokens: {
      type: Number,
      allowNull: false,
      required: [true, 'Please enter a valid tokens'],
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Wallet', WalletSchema);

export default model;
