"use strict";
// import mongoose from 'mongoose';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ['admin', 'mentor', 'mentee'], default: 'mentee' },
//   name: String,
//   bio: String,
//   skills: [String],
//   goals: String,
//   industry: String,
//   location: String,
// });
// export default mongoose.model('user', userSchema);
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'mentor', 'mentee'], default: 'mentee' },
    bio: String,
    skills: [String],
    industry: String,
    goals: String,
}, { timestamps: true });
// 🧠 Important: model name must be 'User'
exports.default = mongoose_1.default.models.User || mongoose_1.default.model('User', userSchema);
