import express from 'express';
import authRouter from './authRouter.js';
import taskRouter from './taskRouter.js';

const router = express.Router();

router.use('/users', authRouter);

router.use('/tasks', taskRouter);

router.use((req, res) => {
  res.render('default.hbs');
});

export default router;