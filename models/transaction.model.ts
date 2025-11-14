import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: String, required: true },
    type: {
      type: String,
      enum: ["deposit", "withdrawal", "ai-return", "investment"],
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, enum: ["USDT", "BTC", "USD"], required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    txHash: String,
    network: String,
    investmentId: String,
  },
  { timestamps: true }
);

export default models.Transaction ||
  model<ITransaction>("Transaction", TransactionSchema);
