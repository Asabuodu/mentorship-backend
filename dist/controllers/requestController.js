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
exports.updateRequestStatus = exports.viewReceivedRequests = exports.viewSentRequests = exports.sendRequest = void 0;
const Request_1 = __importDefault(require("../models/Request"));
// Create mentorship request (mentee -> mentor)
const sendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { mentorId } = req.body;
    const existing = yield Request_1.default.findOne({
        mentor: mentorId,
        mentee: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
    });
    if (existing) {
        res.status(400).json({ error: 'Request already sent' });
        return;
    }
    const newRequest = yield Request_1.default.create({
        mentor: mentorId,
        mentee: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId,
    });
    res.status(201).json(newRequest);
});
exports.sendRequest = sendRequest;
// View sent requests (mentee)
const viewSentRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const requests = yield Request_1.default.find({ mentee: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId }).populate('mentor', 'name bio skills');
    res.json(requests);
});
exports.viewSentRequests = viewSentRequests;
// View received requests (mentor)
const viewReceivedRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const requests = yield Request_1.default.find({ mentor: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId }).populate('mentee', 'name bio goals');
    res.json(requests);
});
exports.viewReceivedRequests = viewReceivedRequests;
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
const updateRequestStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { status } = req.body;
    const requestId = req.params.id;
    const request = yield Request_1.default.findById(requestId);
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
    yield request.save();
    res.status(200).json({ message: 'Status updated' });
    return;
});
exports.updateRequestStatus = updateRequestStatus;
