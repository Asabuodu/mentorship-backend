import nodemailer from 'nodemailer';

export const sendResetEmail = async (to: string, resetLink: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,       // e.g. yourapp@gmail.com
      pass: process.env.EMAIL_PASS,       // app-specific password
    },
  });

  await transporter.sendMail({
    from: `"Mentorship App" <${process.env.EMAIL_USER}>`,
    to,
    subject: '🔑 Reset Your Password',
    html: `
      <p>Hello,</p>
      <p>You requested a password reset. Click the link below to reset it:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  });
};
