import { Request, Response } from 'express';
import Session from '../models/Session';
import RequestModel from '../models/Request';
// import { AuthRequest } from '../middleware/authMiddleware';
import Availability from '../models/Availability';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

// Book a session (after ACCEPTED request)
// export const bookSession = async (req: AuthRequest, res: Response) => {
//   const { mentorId, dateTime } = req.body;

//   // Check if they are matched
//   const match = await RequestModel.findOne({
//     mentor: mentorId,
//     mentee: req.user?.userId,
//     status: 'ACCEPTED',
//   });

//   if (!match){

//      res.status(403).json({ error: 'No accepted mentorship found' });
//     return;
//   } 

//   const session = await Session.create({
//     mentor: mentorId,
//     mentee: req.user?.userId,
//     dateTime,
//   });

//   res.status(201).json(session);
// };

// export const bookSession = async (req: AuthRequest, res: Response) => {
//   const { availabilityId } = req.params;

//   try {
//     const slot = await Availability.findById(availabilityId).populate('mentor');
//     if (!slot || slot.booked) {
//       return res.status(400).json({ error: 'Slot unavailable' });
//     }

//     // Create session
//     const session = await Session.create({
//       mentor: slot.mentor._id,
//       mentee: req.user.userId,
//       dateTime: slot.dateTime,
//     });

//     // Mark slot as booked
//     slot.booked = true;
//     await slot.save();

//     res.status(201).json(session);
//   } catch (err) {
//     console.error('❌ Booking error:', err);
//     res.status(500).json({ error: 'Failed to book session' });
//   }
// };

// Get mentor's sessions
export const getMentorSessions = async (req: AuthRequest, res: Response) => {
  const sessions = await Session.find({ mentor: req.user?.userId }).populate('mentee', 'name');
  res.json(sessions);
};

// Get mentee's sessions
export const getMenteeSessions = async (req: AuthRequest, res: Response) => {
  const sessions = await Session.find({ mentee: req.user?.userId }).populate('mentor', 'name');
  res.json(sessions);
};

// Submit feedback (mentee)
export const submitFeedback = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  const session = await Session.findById(id);

  if (!session || session.mentee.toString() !== req.user?.userId) {
    res.status(403).json({ error: 'Not authorized' });
    return;
  }

  session.feedback = { rating, comment };
  await session.save();

  res.json({ message: 'Feedback submitted' });
};


interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

// Book a session from mentor's availability
export const bookSession = async (req: AuthRequest, res: Response) => {
  const { availabilityId } = req.params;

  try {
    // Ensure availability ID is valid
    if (!mongoose.Types.ObjectId.isValid(availabilityId)) {
      res.status(400).json({ error: 'Invalid availability ID' });
      return;
    }

    const slot = await Availability.findById(availabilityId).populate('mentor');

    if (!slot) {
       res.status(404).json({ error: 'Availability not found' });
      return;
    }

    // Type narrowing
    const slotDoc = slot as typeof slot & { booked: boolean; dateTime: Date };

    if (slotDoc.booked) {
       res.status(400).json({ error: 'Slot already booked' });
      return;
    }

    if (!req.user) {
       res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // ✅ Optional: verify the mentee has an accepted mentorship request
    const hasRequest = await RequestModel.findOne({
      mentor: slotDoc.mentor._id,
      mentee: req.user.userId,
      status: 'ACCEPTED',
    });

    if (!hasRequest) {
       res.status(403).json({ error: 'No accepted mentorship found' });
      return;
    }

    const session = await Session.create({
      mentor: slotDoc.mentor._id,
      mentee: req.user.userId,
      dateTime: slotDoc.dateTime,
    });

    slotDoc.booked = true;
    await slotDoc.save();

    res.status(201).json(session);
  } catch (err) {
    console.error('❌ Booking error:', err);
    res.status(500).json({ error: 'Failed to book session' });
  }
};
