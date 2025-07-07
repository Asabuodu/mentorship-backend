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
exports.getAllSessions = exports.getAllRequests = exports.updateUserRole = exports.getAllUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const Request_1 = __importDefault(require("../models/Request"));
const Session_1 = __importDefault(require("../models/Session"));
// Get all users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find().select('-password');
    res.json(users);
});
exports.getAllUsers = getAllUsers;
// Update a user's role (e.g., promote to mentor)
// export const updateUserRole = async (req: AuthRequest, res: Response) => {
//   const { id } = req.params;
//   const { role } = req.body;
//   if (!['admin', 'mentor', 'mentee'].includes(role)) {
//    return res.status(400).json({ error: 'Invalid role' });
//   }
//   const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
//   if (!updatedUser) return res.status(404).json({ error: 'User not found' });
//   res.json(updatedUser);
// };
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { role } = req.body;
    if (!['admin', 'mentor', 'mentee'].includes(role)) {
        res.status(400).json({ error: 'Invalid role' });
        return;
    }
    const updatedUser = yield user_1.default.findByIdAndUpdate(id, { role }, { new: true }).select('-password');
    if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.json(updatedUser);
});
exports.updateUserRole = updateUserRole;
// View all mentorship requests (optional: for reporting)
const getAllRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield Request_1.default.find()
        .populate('mentor', 'name email')
        .populate('mentee', 'name email');
    res.json(requests);
});
exports.getAllRequests = getAllRequests;
// View all sessions
const getAllSessions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessions = yield Session_1.default.find()
        .populate('mentor', 'name email')
        .populate('mentee', 'name email');
    res.json(sessions);
});
exports.getAllSessions = getAllSessions;
