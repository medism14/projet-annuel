import { NextResponse, NextRequest } from "next/server";
import nodemailer from 'nodemailer';

export const POST = async (request: NextRequest) => {
  try {
    const data = await request.json();
    const senderEmail = data.email;
    const myEmail = "";
    const myPass = "";
    const title = data.title;
    const message = data.message;

    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: myEmail,
        pass: myPass,
      },
    });

    const mailOptions = {
      from: senderEmail,
      to: myEmail,
      subject: title,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json('Email sent successfully!');
} catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email', error: error.message });
}
};
