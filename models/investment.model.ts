import { Schema, Document, model, models, Types } from "mongoose";

export interface IInvestment extends Document {
  userId: Types.ObjectId;
  principal: number;
  days: number;
  dailyRate: number;
  planLabel: string;
  startedAt: Date;
  maturityDate: Date;
  profit: number;
  lastProfitAt: Date;
  matured: boolean;
  status: "active" | "completed" | "cancelled";
}

const InvestmentSchema = new Schema<IInvestment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "UserExtra",
      required: true,
    },
    principal: { type: Number, required: true },
    days: { type: Number, required: true },
    dailyRate: { type: Number, required: true },
    planLabel: { type: String, required: true },
    startedAt: { type: Date, required: true },
    maturityDate: { type: Date, required: true },

    profit: { type: Number, default: 0 }, //  track real per-investment profit
    lastProfitAt: { type: Date, default: null }, //  prevent duplicate daily credits
    matured: { type: Boolean, default: false }, //  ensure migration runs once

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
