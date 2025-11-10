import { Schema, Document, model, models } from "mongoose";

export interface ITransaction extends Document {
  userId: string;
  type: "deposit" | "withdrawal" | "ai-return" | "investment";
  amount: number;
  currency: "USDT" | "BTC" | "USD";
  status: "pending" | "completed" | "failed";
  txHash?: string;
  network?: string;
  investmentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

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
