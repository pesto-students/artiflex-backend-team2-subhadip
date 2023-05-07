import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      allowNull: false,
      required: [true, 'Please enter a valid first name'],
    },
    last_name: {
      type: String,
      allowNull: false,
      required: [true, 'Please enter a valid last name'],
    },
    image: {
      type: String,
      allowNull: true,
      required: [true, 'Please enter a valid profile img'],
      defaultValue:
        'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png',
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter a valid email id'],
    },
    mobile_no: {
      type: String,
      allowNull: false,
      unique: true,
      required: [true, 'Please enter a valid mobile no'],
    },
    password: {
      type: String,
      allowNull: false,
      required: [true, 'Please enter a valid password'],
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model('User', UserSchema);

export default model;
