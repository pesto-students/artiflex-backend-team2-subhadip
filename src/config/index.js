import * as dotenv from 'dotenv';

dotenv.config();

export default {
  SERVER_PORT: process.env.SERVER_PORT,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  TOKEN_HEADER_KEY: process.env.TOKEN_HEADER_KEY,
};
