import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import db from './src/db/db.js';
import authMiddleware from './src/middlewares/authMiddleware.js';
import mainRouter from './src/routers/mainRouter.js';

dotenv.config();

const port = process.env.PORT || 3000;
const dirname = process.cwd();
const app = express();

app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/public', express.static(path.join(dirname, 'public')));
app.use(authMiddleware);
app.use(mainRouter);

app.listen(port, async () => {
  console.log(`Listening to port ${port}`);
  await db.connect();
});

process.on('exit', async () => {
  await db.disconnect();
});