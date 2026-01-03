import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./templates";
import { APP_NAME } from "../utils";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

export const sendWelcomeEmail = async ({ email, name }: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name);

  const mailOptions = {
    from: `"${APP_NAME}" <support@gabriel.com>`,
    to: email,
    subject: `Welcome to ${APP_NAME} - your account is ready!`,
    text: `Thanks for joining ${APP_NAME}. You now have the tools to trade your way to a life changing return on your investments!`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
