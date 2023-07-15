import { mongoose, Schema } from 'mongoose';

const TokenTransactionSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      allowNull: false,
      required: [true, 'Please enter a valid user id'],
    },
    transaction_process: {
      type: String,
      allowNull: false,
      required: [true, 'Please enter a valid transaction process'],
    },
    token_number: {
      type: String,
      allowNull: false,
      required: [true, 'Please enter a valid token number'],
    },
    razorpay_transaction_id: {
      type: String,
      allowNull: false,
      required: [true, 'Please enter a valid razorpay transaction id'],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('Token_Transaction', TokenTransactionSchema);

export default model;
