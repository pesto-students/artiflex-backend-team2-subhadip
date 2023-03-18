import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      allowNull: false,
      uniqueKey: false,
    },
    last_name: {
      type: String,
      allowNull: true,
      uniqueKey: false,
    },
    image: {
      type: String,
      allowNull: true,
      defaultValue:
        'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile_no: {
      type: String,
      allowNull: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('User', UserSchema);

export default model;
