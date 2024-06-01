import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import hbs from 'hbs';

import userController from './src/controllers/userController.js';
import taskContoller from './src/controllers/taskContoller.js';

const port = process.env.PORT || 3000;
const dirname = process.cwd();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static(path.join(dirname, 'public')));
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(userController.checkAutorization);

app.get('/login', (req, res) => {
  res.render('loginView.hbs');
});

app.post('/login', userController.authorizeUser);

app.get('/register', (req, res) => {
  res.render('registerView.hbs');
});

app.post('/register', userController.registerUser);

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});