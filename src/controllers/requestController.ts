import { Request, Response } from 'express';
import MentorshipRequest from '../models/Request';

interface AuthRequest extends Request {
  user?: { userId: string; role: string };
}

// Create mentorship request (mentee -> mentor)
export const sendRequest = async (req: AuthRequest, res: Response) => {
  const { mentorId } = req.body;

  const existing = await MentorshipRequest.findOne({
    mentor: mentorId,
    mentee: req.user?.userId,
  });

  if (existing){

   res.status(400).json({ error: 'Request already sent' });
    return;
  } 

  const newRequest = await MentorshipRequest.create({
    mentor: mentorId,
    mentee: req.user?.userId,
  });

  res.status(201).json(newRequest);
};

// View sent requests (mentee)
export const viewSentRequests = async (req: AuthRequest, res: Response) => {
  const requests = await MentorshipRequest.find({ mentee: req.user?.userId }).populate('mentor', 'name bio skills');
  res.json(requests);
};

// View received requests (mentor)
export const viewReceivedRequests = async (req: AuthRequest, res: Response) => {
  const requests = await MentorshipRequest.find({ mentor: req.user?.userId }).populate('mentee', 'name bio goals');
  res.json(requests);
};

// Accept/Reject request (mentor)
// export const updateRequestStatus = async (req: AuthRequest, res: Response) => {
//   const { id } = req.params;
//   const { status } = req.body; // ACCEPTED or REJECTED

//   const request = await MentorshipRequest.findById(id);

//   if (!request || request.mentor.toString() !== req.user?.userId) {
//      res.status(403).json({ error: 'Not allowed' });
//     return;
//   }

//   request.status = status;
//   await request.save();

//   res.json(request);
// };


export const updateRequestStatus = async (req: AuthRequest, res: Response) => {
  const { status } = req.body;
  const requestId = req.params.id;

  const request = await MentorshipRequest.findById(requestId);
  if (!request) {
     res.status(404).json({ error: 'Request not found' });
    return;
  }

  // 🛡️ Ensure only assigned mentor can update
  if (!req.user || request.mentor.toString() !== req.user.userId) {
     res.status(403).json({ error: 'Not authorized' });
    return;
  }

  request.status = status;
  await request.save();

   res.status(200).json({ message: 'Status updated' });
   return;
};
