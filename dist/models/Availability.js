"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const availabilitySchema = new mongoose_1.default.Schema({
    mentor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    dayOfWeek: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
    startTime: { type: String, required: true }, // e.g., "14:00"
    endTime: { type: String, required: true }, // e.g., "16:00"
    dateTime: { type: Date, required: true }, // ✅ bookable moment
    booked: { type: Boolean, default: false }, // ✅ track usage
}, { timestamps: true });
exports.default = mongoose_1.default.models.Availability ||
    mongoose_1.default.model('Availability', availabilitySchema);
