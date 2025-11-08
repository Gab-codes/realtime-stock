import { Schema, Document, model, models } from "mongoose";

export interface IInvestment extends Document {
  userId: string;
  principal: number;
  plan: "30d" | "60d" | "90d";
  dailyRate: number;
  startDate: Date;
  endDate: Date;
  profitAccrued: number;
  status: "active" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const InvestmentSchema = new Schema<IInvestment>(
  {
    userId: { type: String, required: true },
    principal: { type: Number, required: true },
    plan: { type: String, enum: ["30d", "60d", "90d"], required: true },
    dailyRate: { type: Number, required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
    profitAccrued: { type: Number, default: 0 },
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
