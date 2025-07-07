import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import requestRoutes from './routes/requestRoutes';
import sessionRoutes from './routes/sessionRoutes';
import mentorRoutes from './routes/mentorRoutes';
import availabilityRoutes from './routes/availabilityRoutes';
import adminRoutes from './routes/adminRoutes';




dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/availability', availabilityRoutes);
app.use('/api/admin', adminRoutes);





const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('MongoDB error:', err));
