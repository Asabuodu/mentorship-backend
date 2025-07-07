"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSession = exports.submitFeedback = exports.getMenteeSessions = exports.getMentorSessions = void 0;
const Session_1 = __importDefault(require("../models/Session"));
const Request_1 = __importDefault(require("../models/Request"));
// import { AuthRequest } from '../middleware/authMiddleware';
const Availability_1 = __importDefault(require("../models/Availability"));
const mongoose_1 = __importDefault(require("mongoose"));
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
const getMentorSessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sessions = yield Session_1.default.find({ mentor: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId }).populate('mentee', 'name');
    res.json(sessions);
});
exports.getMentorSessions = getMentorSessions;
// Get mentee's sessions
const getMenteeSessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const sessions = yield Session_1.default.find({ mentee: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId }).populate('mentor', 'name');
    res.json(sessions);
});
exports.getMenteeSessions = getMenteeSessions;
// Submit feedback (mentee)
const submitFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { rating, comment } = req.body;
    const session = yield Session_1.default.findById(id);
    if (!session || session.mentee.toString() !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId)) {
        res.status(403).json({ error: 'Not authorized' });
        return;
    }
    session.feedback = { rating, comment };
    yield session.save();
    res.json({ message: 'Feedback submitted' });
});
exports.submitFeedback = submitFeedback;
// Book a session from mentor's availability
const bookSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { availabilityId } = req.params;
    try {
        // Ensure availability ID is valid
        if (!mongoose_1.default.Types.ObjectId.isValid(availabilityId)) {
            res.status(400).json({ error: 'Invalid availability ID' });
            return;
        }
        const slot = yield Availability_1.default.findById(availabilityId).populate('mentor');
        if (!slot) {
            res.status(404).json({ error: 'Availability not found' });
            return;
        }
        // Type narrowing
        const slotDoc = slot;
        if (slotDoc.booked) {
            res.status(400).json({ error: 'Slot already booked' });
            return;
        }
        if (!req.user) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }
        // ✅ Optional: verify the mentee has an accepted mentorship request
        const hasRequest = yield Request_1.default.findOne({
            mentor: slotDoc.mentor._id,
            mentee: req.user.userId,
            status: 'ACCEPTED',
        });
        if (!hasRequest) {
            res.status(403).json({ error: 'No accepted mentorship found' });
            return;
        }
        const session = yield Session_1.default.create({
            mentor: slotDoc.mentor._id,
            mentee: req.user.userId,
            dateTime: slotDoc.dateTime,
        });
        slotDoc.booked = true;
        yield slotDoc.save();
        res.status(201).json(session);
    }
    catch (err) {
        console.error('❌ Booking error:', err);
        res.status(500).json({ error: 'Failed to book session' });
    }
});
exports.bookSession = bookSession;
