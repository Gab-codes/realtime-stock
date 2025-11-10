import { Schema, Document, model, models } from "mongoose";

export interface IInvestment extends Document {
  userId: string;
  principal: number;
  days: number;
  dailyRate: number;
  totalRate: number;
  planLabel: string;
  startedAt: Date;
  maturityDate: Date;
  status: "active" | "completed" | "cancelled";
}

const InvestmentSchema = new Schema<IInvestment>(
  {
    userId: { type: String, required: true },
    principal: { type: Number, required: true },
    days: { type: Number, required: true },
    dailyRate: { type: Number, required: true },
    totalRate: { type: Number, required: true },
    planLabel: { type: String, required: true },
    startedAt: { type: Date, required: true },
    maturityDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default models.Investment ||
  model<IInvestment>("Investment", InvestmentSchema);
