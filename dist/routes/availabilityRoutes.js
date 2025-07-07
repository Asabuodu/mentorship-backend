"use strict";
// import express from 'express';
// import {
//   addAvailability,
//   getMyAvailability,
//   deleteAvailability
// } from '../controllers/availabilityController';
// import { authenticate, authorizeRoles } from '../middleware/authMiddleware';
// import Availability from '../models/Availability';
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
const express_1 = __importDefault(require("express"));
const availabilityController_1 = require("../controllers/availabilityController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const Availability_1 = __importDefault(require("../models/Availability"));
const Session_1 = __importDefault(require("../models/Session")); // ✅ Fix: import Session model
const router = express_1.default.Router();
// 🔐 All mentor routes protected
router.use(authMiddleware_1.authenticate);
router.use((0, authMiddleware_1.authorizeRoles)('mentor'));
// Mentor-specific availability routes
router.post('/', availabilityController_1.addAvailability);
router.get('/', availabilityController_1.getMyAvailability);
router.delete('/:id', availabilityController_1.deleteAvailability);
// ✅ Mentee route to view a mentor's slots (unprotected outside above middleware)
router.get('/mentor/:mentorId', authMiddleware_1.authenticate, (0, authMiddleware_1.authorizeRoles)('mentee'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { mentorId } = req.params;
    const slots = yield Availability_1.default.find({ mentor: mentorId });
    res.json(slots);
}));
// ✅ Mentee books a session from availability
router.post('/book/:availabilityId', authMiddleware_1.authenticate, (0, authMiddleware_1.authorizeRoles)('mentee'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { availabilityId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // ✅ Type-safe now
    try {
        const session = yield Session_1.default.create({
            availability: availabilityId,
            mentee: userId,
        });
        res.status(201).json(session);
    }
    catch (error) {
        console.error('❌ Booking error:', error);
        res.status(500).json({ error: 'Failed to book session' });
    }
}));
exports.default = router;
