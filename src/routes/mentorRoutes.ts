import express from 'express';
import { listMentors } from '../controllers/mentorController';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticate, authorizeRoles('mentee'), listMentors);

export default router;
