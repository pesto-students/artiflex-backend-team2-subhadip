import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';

import config from './config';
import Logger from './utils/logger';
import { errorHandler, successHandler } from './middlewares/logger.middleware';

import Routes from './routes';


const app = express();
const logger = Logger('app');

app.use(successHandler);
app.use(errorHandler);
app.use(cors());

// Replace YOUR_USERNAME and YOUR_PASSWORD with your MongoDB Atlas username and password
const uri = `mongodb://localhost:27017/artiflex`;

app.use('/demo', Routes.DemoRoutes);
app.use('/user', Routes.UserRoutes);

app.listen(config.SERVER_PORT, () => {
  // Connect to the database
  // mongoose.set('strictQuery', false);
  mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error(error));

  logger.info(`server is up at http://localhost:${config.SERVER_PORT}`);
});
