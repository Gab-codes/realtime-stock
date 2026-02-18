import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";
import { APP_NAME } from "../utils";

export const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  secure: true,
  port: 465,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});

export const sendWelcomeEmail = async ({ email, name }: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name);

  const mailOptions = {
    from: `"${APP_NAME}" <support@${process.env.RESEND_DOMAIN}>`,
    to: email,
    subject: `Welcome to ${APP_NAME} - your account is ready!`,
    text: `Thanks for joining ${APP_NAME}. You now have the tools to trade your way to a life changing return on your investments!`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
