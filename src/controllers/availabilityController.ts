import { Request, Response } from 'express';
import Availability from '../models/Availability';

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

// Add availability block
// export const addAvailability = async (req: AuthRequest, res: Response) => {
//   const { dayOfWeek, startTime, endTime } = req.body;

//   const exists = await Availability.findOne({
//     mentor: req.user?.userId,
//     dayOfWeek,
//     startTime,
//     endTime,
//   });

//   if (exists){
//      res.status(400).json({ error: 'This time block already exists' });
//       return;
//   } 

//   const availability = await Availability.create({
//     mentor: req.user?.userId,
//     dayOfWeek,
//     startTime,
//     endTime,
//   });

//   res.status(201).json(availability);
// };
export const addAvailability = async (req: AuthRequest, res: Response) => {
  const { dayOfWeek, startTime, endTime } = req.body;

  if (!dayOfWeek || !startTime || !endTime) {
     res.status(400).json({ error: 'Missing fields' });
    return;
  }

  // Map dayOfWeek to next upcoming date
  const daysMap: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const today = new Date();
  const targetDay = daysMap[dayOfWeek];
  const currentDay = today.getDay();

  const diff = (targetDay + 7 - currentDay) % 7;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + diff);

  const [hours, minutes] = startTime.split(':').map(Number);
  targetDate.setHours(hours, minutes, 0, 0);

  const availability = await Availability.create({
    mentor: req.user?.userId,
    dayOfWeek,
    startTime,
    endTime,
    dateTime: targetDate, // ✅ calculated here
  });

  res.status(201).json(availability);
};


// Get availability blocks for mentor
export const getMyAvailability = async (req: AuthRequest, res: Response) => {
  const blocks = await Availability.find({ mentor: req.user?.userId });
  res.json(blocks);
};

// Delete an availability block
export const deleteAvailability = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const deleted = await Availability.findOneAndDelete({
    _id: id,
    mentor: req.user?.userId,
  });

  if (!deleted){
    
     res.status(404).json({ error: 'Not found or unauthorized' });
      return;
  }

  res.json({ message: 'Availability deleted' });
};
