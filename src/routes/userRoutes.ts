import express from 'express';
import { getMyProfile, updateMyProfile } from '../controllers/userController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.get('/me',  getMyProfile);
router.put('/me/profile',  updateMyProfile);

export default router;
