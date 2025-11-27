import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { transporter } from "@/lib/nodemailer";
import { APP_NAME } from "../utils";

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
      sendVerificationEmail: async ({ user, url }: any) => {
        try {
          const to = user?.email;
          const subject = "Verify your email address";
          const text = `Click the link to verify your email: ${url}`;
          const html = `<p>Hi ${
            user?.name || ""
          },</p><p>Please verify your email by clicking the link below. This link will expire in 1 hour:</p><p><a href="${url}">${url}</a></p>`;

          await transporter.sendMail({
            from: `"${APP_NAME}" <support@gabriel.com>`,
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
