import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';
import Logger from './utils/logger';
import { errorHandler, successHandler } from './middlewares/logger.middleware';

import Routes from './routes';

const app = express();
const logger = Logger('app');

app.use(express.json());
app.use(successHandler);
app.use(errorHandler);
app.use(cors());

// const uri = 'mongodb://localhost:27017/artiflex';
const uri =
  'mongodb+srv://artiflex:artiflex@artiflex.48fvane.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info(`DB Connection Is Sucessfull`);
  });

app.use('/demo', Routes.DemoRoutes);
app.use('/auth', Routes.AuthRoutes);

app.listen(config.SERVER_PORT, () => {
  logger.info(`Server Is Up At http://localhost:${config.SERVER_PORT}`);
});
