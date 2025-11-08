import { Schema, Document, model, models } from "mongoose";

export interface IUserExtra extends Document {
  userId: string;
  depositedBalance: number;
  investmentBalance: number;
  totalProfit: number;
  kycVerified: boolean;
}

const UserExtraSchema = new Schema<IUserExtra>(
  {
    userId: { type: String, required: true, unique: true },
    depositedBalance: { type: Number, default: 0 },
    investmentBalance: { type: Number, default: 0 },
    totalProfit: { type: Number, default: 0 },
    kycVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default models.UserExtra ||
  model<IUserExtra>("UserExtra", UserExtraSchema);
