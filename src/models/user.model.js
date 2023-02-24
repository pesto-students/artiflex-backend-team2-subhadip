import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    },
    { collation: 'user-data' }
);

const model = mongoose.model('UserData', User);

export default model;