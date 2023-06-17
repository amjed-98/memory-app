import express from 'express';
import cors from 'cors';
import connectDB from './database/config/connection';
import router from './router';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

connectDB();
const app = express();
app.use([
  morgan('dev'),
  cors(),
  cookieParser(),
  express.urlencoded({ extended: true }),
  express.json(),
]);
app.use(router);

export default app;
