import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export async function sendVerificationCode(email: string, code: number) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}. It will expire in 5 minutes.`,
    });
    
    console.log(`Verification code sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email could not be sent');
  }
}