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
exports.updateMyProfile = exports.getMyProfile = void 0;
const user_1 = __importDefault(require("../models/user"));
const getMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId).select('-password');
    if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.json(user);
});
exports.getMyProfile = getMyProfile;
const updateMyProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, bio, skills, goals } = req.body;
    const updated = yield user_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a.userId, { name, bio, skills, goals }, { new: true }).select('-password');
    if (!updated) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.json(updated);
});
exports.updateMyProfile = updateMyProfile;
