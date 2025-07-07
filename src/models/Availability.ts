import mongoose from 'mongoose';


const availabilitySchema = new mongoose.Schema(
  {
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dayOfWeek: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], required: true },
    startTime: { type: String, required: true }, // e.g., "14:00"
    endTime: { type: String, required: true },   // e.g., "16:00"
      dateTime: { type: Date, required: true },  // ✅ bookable moment
    booked: { type: Boolean, default: false }, // ✅ track usage
  },
  { timestamps: true }
);

export default mongoose.models.Availability ||
mongoose.model('Availability', availabilitySchema);
