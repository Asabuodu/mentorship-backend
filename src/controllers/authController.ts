import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { sendResetEmail } from '../utils/sendEmail'; 


export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, role });
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {

      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {

       res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || '', {
      expiresIn: '1d',
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};



// export const requestResetPassword = async (req: Request, res: Response) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user){
//        res.status(404).json({ error: 'User not found' });
//       return;
//     }

//     const resetToken = jwt.sign(
//       { userId: user._id },
//       process.env.JWT_SECRET || '',
//       { expiresIn: '15m' } // token expires in 15 mins
//     );

//     // In production, you'd email this link
//     // const resetLink = `https://mentorship-frontend-git-master-asabuodu-innocents-projects.vercel.app/reset-password?token=${resetToken}`;
//         const resetLink = `localhost:3000/reset-password?token=${resetToken}`;
    

//     // For now, just return it
//     res.json({ message: 'Password reset link generated', resetLink });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to generate reset link' });
//   }
// };

export const requestResetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user){
       res.status(404).json({ error: 'User not found' });
       return;
    } 

    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || '',
      { expiresIn: '15m' }
    );

      const resetLink = `https://mentorship-frontend-git-master-asabuodu-innocents-projects.vercel.app/reset-password?token=${resetToken}`;
      //  const resetLink = `localhost:3000/reset-password?token=${resetToken}`;

    await sendResetEmail(email, resetLink); // ✅ Send the actual email

    res.json({ message: 'Reset link sent to email' });
  } catch (err) {
    console.error('❌ Reset error:', err);
    res.status(500).json({ error: 'Failed to send reset link' });
  }
};



export const resetPassword = async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || '') as { userId: string };

    const user = await User.findById(payload.userId);
    if (!user){
       res.status(404).json({ error: 'User not found' });
      return;
    } 

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};