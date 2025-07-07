"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const requestController_1 = require("../controllers/requestController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.use(authMiddleware_1.authenticate);
// Mentee sends request
router.post('/', (0, authMiddleware_1.authorizeRoles)('mentee'), requestController_1.sendRequest);
// Mentee views sent requests
router.get('/sent', (0, authMiddleware_1.authorizeRoles)('mentee'), requestController_1.viewSentRequests);
// Mentor views received requests
router.get('/received', (0, authMiddleware_1.authorizeRoles)('mentor'), requestController_1.viewReceivedRequests);
// Mentor accepts/rejects a request
router.put('/:id', (0, authMiddleware_1.authorizeRoles)('mentor'), requestController_1.updateRequestStatus);
exports.default = router;
