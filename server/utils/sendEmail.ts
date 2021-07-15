import nodemailer, { TransportOptions } from "nodemailer";

interface Options {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: Options) => {
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  } as TransportOptions);

  const message = {
    from: `${process.env.SMTP_SENDER_NAME} <${process.env.SMTP_SENDER_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  await transport.sendMail(message);
};

export default sendEmail;
