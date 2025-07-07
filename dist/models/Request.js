"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const requestSchema = new mongoose_1.default.Schema({
    mentee: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    mentor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['PENDING', 'ACCEPTED', 'REJECTED'], default: 'PENDING' },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Request', requestSchema);
