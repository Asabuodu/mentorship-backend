// import mongoose from 'mongoose';

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



import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
  {
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mentee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dateTime: { type: Date, required: true },
    feedback: {
      rating: Number,
      comment: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Session || mongoose.model('Session', sessionSchema);
