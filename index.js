import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import authMiddleware from './src/middlewares/authMiddleware.js';
import authRouter from './src/routers/authRouter.js';
import taskRouter from './src/routers/taskRouter.js';

const port = process.env.PORT || 3000;
const dirname = process.cwd();

const app = express();

app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/public', express.static(path.join(dirname, 'public')));
app.use('/', authMiddleware);

app.use('/users', authRouter);
app.use('/tasks', taskRouter);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});