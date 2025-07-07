// import express from 'express';
// import {
//   addAvailability,
//   getMyAvailability,
//   deleteAvailability
// } from '../controllers/availabilityController';
// import { authenticate, authorizeRoles } from '../middleware/authMiddleware';
// import Availability from '../models/Availability';


// const router = express.Router();
// router.use(authenticate);
// router.use(authorizeRoles('mentor'));

// router.post('/', authorizeRoles('mentor'), addAvailability);
// router.get('/', authorizeRoles('mentor'), getMyAvailability);
// router.delete('/:id', authorizeRoles('mentor'), deleteAvailability);

// router.get('/mentor/:mentorId', authenticate, authorizeRoles('mentee'), async (req, res) => {
//   const { mentorId } = req.params;
//   const slots = await Availability.find({ mentor: mentorId });
//   res.json(slots);
// });
// router.post('/book/:availabilityId', authenticate, authorizeRoles('mentee'), async (req, res) => {
//   const { availabilityId } = req.params;
//   const { userId } = req.user; // Assuming userId is available in the request object
//   try {
//     const session = await Session.create({
//       availability: availabilityId,
//       mentee: userId,
//     });
//     res.status(201).json(session);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to book session' });
//   }
// });

// export default router;


import express, { Request, Response } from 'express';
import {
  addAvailability,
  getMyAvailability,
  deleteAvailability,
} from '../controllers/availabilityController';
import { authenticate, authorizeRoles } from '../middleware/authMiddleware';
import Availability from '../models/Availability';
import Session from '../models/Session'; // ✅ Fix: import Session model

const router = express.Router();

// ✅ Custom request type for accessing req.user
interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

// 🔐 All mentor routes protected
router.use(authenticate);
router.use(authorizeRoles('mentor'));

// Mentor-specific availability routes
router.post('/', addAvailability);
router.get('/', getMyAvailability);
router.delete('/:id', deleteAvailability);

// ✅ Mentee route to view a mentor's slots (unprotected outside above middleware)
router.get('/mentor/:mentorId', authenticate, authorizeRoles('mentee'), async (req, res) => {
  const { mentorId } = req.params;
  const slots = await Availability.find({ mentor: mentorId });
  res.json(slots);
});

// ✅ Mentee books a session from availability
router.post('/book/:availabilityId', authenticate, authorizeRoles('mentee'), async (req: AuthRequest, res: Response) => {
  const { availabilityId } = req.params;
  const userId = req.user?.userId; // ✅ Type-safe now

  try {
    const session = await Session.create({
      availability: availabilityId,
      mentee: userId,
    });

    res.status(201).json(session);
  } catch (error) {
    console.error('❌ Booking error:', error);
    res.status(500).json({ error: 'Failed to book session' });
  }
});

export default router;
