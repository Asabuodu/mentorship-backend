// import mongoose from 'mongoose';

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



import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'mentor', 'mentee'], default: 'mentee' },
    bio: String,
    skills: [String],
    industry: String,
    goals: String,
  },
  { timestamps: true }
);

// 🧠 Important: model name must be 'User'
export default mongoose.models.User || mongoose.model('User', userSchema);
