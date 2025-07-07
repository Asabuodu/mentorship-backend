import express from 'express';
import {
  bookSession,
  getMentorSessions,
  getMenteeSessions,
  submitFeedback,
} from '../controllers/sessionController';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware';

const router = express.Router();
router.use(authenticate);

// Mentee books a session
router.post('/',  authorizeRoles('mentee'), bookSession);

// Mentor's sessions
router.get('/mentor',  authorizeRoles('mentor'), getMentorSessions);

// Mentee's sessions
router.get('/mentee',  authorizeRoles('mentee'), getMenteeSessions);

// Mentee submits feedback
router.put('/:id/feedback',  authorizeRoles('mentee'), submitFeedback);

router.post('/book/:availabilityId', authenticate, authorizeRoles('mentee'), bookSession);

export default router;
