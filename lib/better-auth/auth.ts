import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { transporter } from "@/lib/nodemailer";
import { APP_NAME, SUPPORT_EMAIL } from "../utils";
import { getEmailTemplate } from "../nodemailer/email-template";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
  if (authInstance) return authInstance;

  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;
  if (!db) throw new Error("Database not connected, check your connection.");

  authInstance = betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        try {
          const to = user?.email;
          const subject = "Verify your email address";
          const text = `Click the link to verify your email: ${url}`;
          const html = getEmailTemplate({
            title: "Verify your email address",
            greeting: user?.name || "there",
            body: "Please verify your email by clicking the button below. This link will expire in 1 hour.",
            buttonText: "Verify Email",
            buttonUrl: url,
          });

          await transporter.sendMail({
            from: `${APP_NAME} <support@${process.env.RESEND_DOMAIN}>`,
            replyTo: `${APP_NAME} <${SUPPORT_EMAIL}>`,
            to,
            subject,
            text,
            html,
          });
        } catch (err) {
          console.error("Error sending verification email", err);
          throw err;
        }
      },
      sendOnSignUp: true,
      sendOnSignIn: true,
      autoSignInAfterVerification: true,
    },

    emailAndPassword: {
      enabled: true,
      sendResetPassword: async ({ user, url }) => {
        try {
          const to = user?.email;
          const subject = "Reset your password";
          const text = `Click the link to reset your password: ${url}`;
          const html = getEmailTemplate({
            title: "Reset your password",
            greeting: user?.name || "there",
            body: "Please reset your password by clicking the button below. This link will expire in 1 hour.",
            buttonText: "Reset Password",
            buttonUrl: url,
          });

          await transporter.sendMail({
            from: `${APP_NAME} <support@${process.env.RESEND_DOMAIN}>`,
            replyTo: `${APP_NAME} <${SUPPORT_EMAIL}>`,
            to,
            subject,
            text,
            html,
          });
        } catch (err) {
          console.error("Error sending verification email", err);
          throw err;
        }
      },
      disableSignUp: false,
      requireEmailVerification: true,
      minPasswordLength: 8,
      maxPasswordLength: 50,
      // autoSignIn: true,
    },
    plugins: [nextCookies(), admin()],
  });

  return authInstance;
};

export const auth = await getAuth();
