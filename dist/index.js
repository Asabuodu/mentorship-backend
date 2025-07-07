"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const requestRoutes_1 = __importDefault(require("./routes/requestRoutes"));
const sessionRoutes_1 = __importDefault(require("./routes/sessionRoutes"));
const mentorRoutes_1 = __importDefault(require("./routes/mentorRoutes"));
const availabilityRoutes_1 = __importDefault(require("./routes/availabilityRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/users', userRoutes_1.default);
app.use('/api/requests', requestRoutes_1.default);
app.use('/api/sessions', sessionRoutes_1.default);
app.use('/api/mentors', mentorRoutes_1.default);
app.use('/api/availability', availabilityRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
const PORT = process.env.PORT || 5000;
mongoose_1.default
    .connect(process.env.MONGO_URI || '')
    .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((err) => console.error('MongoDB error:', err));
