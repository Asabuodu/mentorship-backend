"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// ✅ Protect all routes
router.use(authMiddleware_1.authenticate);
router.use((0, authMiddleware_1.authorizeRoles)('admin'));
router.get('/users', adminController_1.getAllUsers);
router.put('/users/:id/role', adminController_1.updateUserRole);
router.get('/requests', adminController_1.getAllRequests);
router.get('/sessions', adminController_1.getAllSessions);
exports.default = router;
