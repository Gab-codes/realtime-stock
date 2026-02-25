import { Schema, model, models } from "mongoose";

const TransactionSchema = new Schema<ITransaction>(
  {
    userId: { type: String, required: true },
    type: {
      type: String,
      enum: [
        "deposit",
        "withdrawal",
        "ai-return",
        "investment",
        "referral-bonus",
      ],
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
    description: String,
  },
  { timestamps: true },
);

// (IMPORTANT FOR SCALING)
TransactionSchema.index({ userId: 1, createdAt: -1 });
TransactionSchema.index({ investmentId: 1 });

export default models.Transaction ||
  model<ITransaction>("Transaction", TransactionSchema);
