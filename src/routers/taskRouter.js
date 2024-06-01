import express from 'express';
import taskContoller from '../controllers/taskContoller.js';

const router = express.Router();

router.get('/all', taskContoller.getAllTasks);

export default router;
