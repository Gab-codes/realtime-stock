import { Schema, Document, model, models } from "mongoose";

export interface IUserExtra extends Document {
  fullName: string;
  email: string;
  userId: string;
  depositedBalance: number;
  investmentBalance: number;
  totalProfit: number;
  kycStatus: "verified" | "pending" | "rejected" | "unverified";
}

const UserExtraSchema = new Schema<IUserExtra>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userId: { type: String, required: true, unique: true },
    depositedBalance: { type: Number, default: 0 },
    investmentBalance: { type: Number, default: 0 },
    totalProfit: { type: Number, default: 0 },
    kycStatus: { type: String, default: "unverified" },
  },
  { timestamps: true }
);

export default models.UserExtra ||
  model<IUserExtra>("UserExtra", UserExtraSchema);
