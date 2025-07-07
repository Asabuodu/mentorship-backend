import express from 'express';
import {
  sendRequest,
  viewSentRequests,
  viewReceivedRequests,
  updateRequestStatus,
} from '../controllers/requestController';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware';

const router = express.Router();
router.use(authenticate);

// Mentee sends request
router.post('/', authorizeRoles('mentee'), sendRequest);

// Mentee views sent requests
router.get('/sent', authorizeRoles('mentee'), viewSentRequests);

// Mentor views received requests
router.get('/received', authorizeRoles('mentor'), viewReceivedRequests);

// Mentor accepts/rejects a request
router.put('/:id', authorizeRoles('mentor'), updateRequestStatus);

export default router;
