import express from 'express';
import {
  getAllUsers,
  updateUserRole,
  getAllRequests,
  getAllSessions,
} from '../controllers/adminController';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware';

const router = express.Router();

// ✅ Protect all routes
router.use(authenticate);
router.use(authorizeRoles('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.get('/requests', getAllRequests);
router.get('/sessions', getAllSessions);

export default router;
