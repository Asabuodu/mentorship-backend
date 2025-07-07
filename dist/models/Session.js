"use strict";
// import mongoose from 'mongoose';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const sessionSchema = new mongoose.Schema(
//   {
//     mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     dateTime: { type: Date, required: true },
//     feedback: {
//       rating: { type: Number, min: 1, max: 5 },
//       comment: String,
//     },
//     mentorComment: String,
//   },
//   { timestamps: true }
// );
// export default mongoose.model('Session', sessionSchema);
const mongoose_1 = __importDefault(require("mongoose"));
const sessionSchema = new mongoose_1.default.Schema({
    mentor: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    mentee: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    dateTime: { type: Date, required: true },
    feedback: {
        rating: Number,
        comment: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.models.Session || mongoose_1.default.model('Session', sessionSchema);
