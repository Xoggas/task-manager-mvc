import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('loginView.hbs', {
    actionLink: '/users/login',
    redirectLink: '/users/register'
  });
});

router.post('/login', userController.authorizeUser);

router.get('/register', (req, res) => {
  res.render('registerView.hbs', {
    actionLink: '/users/register',
    redirectLink: '/users/login'
  });
});

router.post('/register', userController.registerUser);

export default router;
