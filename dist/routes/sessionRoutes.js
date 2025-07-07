"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sessionController_1 = require("../controllers/sessionController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticate);
// Mentee books a session
router.post('/', (0, authMiddleware_1.authorizeRoles)('mentee'), sessionController_1.bookSession);
// Mentor's sessions
router.get('/mentor', (0, authMiddleware_1.authorizeRoles)('mentor'), sessionController_1.getMentorSessions);
// Mentee's sessions
router.get('/mentee', (0, authMiddleware_1.authorizeRoles)('mentee'), sessionController_1.getMenteeSessions);
// Mentee submits feedback
router.put('/:id/feedback', (0, authMiddleware_1.authorizeRoles)('mentee'), sessionController_1.submitFeedback);
router.post('/book/:availabilityId', authMiddleware_1.authenticate, (0, authMiddleware_1.authorizeRoles)('mentee'), sessionController_1.bookSession);
exports.default = router;
