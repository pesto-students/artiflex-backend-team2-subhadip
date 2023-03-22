import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';
import Logger from './utils/logger';
import { errorHandler, successHandler } from './middlewares/logger.middleware';

import Routes from './routes';

const app = express();
const logger = Logger('app');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(successHandler);
app.use(errorHandler);
app.use(cors());

const uri = config.DATABSE_URL;

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
app.use('/post', Routes.PostRouter);

app.listen(config.SERVER_PORT || 4000, () => {
  logger.info(`Server Is Up At http://localhost:${config.SERVER_PORT}`);
});
