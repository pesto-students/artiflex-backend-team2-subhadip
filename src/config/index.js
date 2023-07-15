import * as dotenv from 'dotenv';

dotenv.config();

export default {
  SERVER_PORT: process.env.SERVER_PORT,
  CLIENT_URL: process.env.CLIENT_URL,
  DATABSE_URL: process.env.DATABSE_URL,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  TOKEN_HEADER_KEY: process.env.TOKEN_HEADER_KEY,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  RAZERPAY_KEY_ID: process.env.RAZERPAY_KEY_ID,
  RAZERPAY_SECRET_KEY: process.env.RAZERPAY_SECRET_KEY,
};
