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
exports.deleteAvailability = exports.getMyAvailability = exports.addAvailability = void 0;
const Availability_1 = __importDefault(require("../models/Availability"));
// Add availability block
const addAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { dayOfWeek, startTime, endTime } = req.body;
    const exists = yield Availability_1.default.findOne({
        mentor: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
        dayOfWeek,
        startTime,
        endTime,
    });
    if (exists) {
        res.status(400).json({ error: 'This time block already exists' });
        return;
    }
    const availability = yield Availability_1.default.create({
        mentor: (_b = req.user) === null || _b === void 0 ? void 0 : _b.userId,
        dayOfWeek,
        startTime,
        endTime,
    });
    res.status(201).json(availability);
});
exports.addAvailability = addAvailability;
// Get availability blocks for mentor
const getMyAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blocks = yield Availability_1.default.find({ mentor: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId });
    res.json(blocks);
});
exports.getMyAvailability = getMyAvailability;
// Delete an availability block
const deleteAvailability = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const deleted = yield Availability_1.default.findOneAndDelete({
        _id: id,
        mentor: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
    });
    if (!deleted) {
        res.status(404).json({ error: 'Not found or unauthorized' });
        return;
    }
    res.json({ message: 'Availability deleted' });
});
exports.deleteAvailability = deleteAvailability;
