import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/login', (req, res) => {
  res.render('loginView.hbs');
});

router.post('/login', userController.authorizeUser);

router.get('/register', (req, res) => {
  res.render('registerView.hbs');
});

router.post('/register', userController.registerUser);

export default router;
