"use server";

import axios from "axios";

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

export async function notifyAdmin(message: string) {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_ADMIN_CHAT_ID) {
    console.error("Telegram env vars missing");
    return;
  }

  try {
    await axios.post(TELEGRAM_API, {
      chat_id: process.env.TELEGRAM_ADMIN_CHAT_ID,
      text: message,
      parse_mode: "Markdown",
    });
  } catch (err) {
    console.error("Failed to send Telegram message:", err);
  }
}
