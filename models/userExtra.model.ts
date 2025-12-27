import { Schema, Document, model, models, Types } from "mongoose";

export interface IUserExtra extends Document {
  fullName: string;
  email: string;
  userId: Types.ObjectId;
  depositedBalance: number;
  investmentBalance: number;
  totalProfit: number;
  kycStatus: "verified" | "pending" | "rejected" | "unverified";
  referralCode?: string;
  referrer?: Types.ObjectId | null;
  totalReferralBonus?: number;
}

const UserExtraSchema = new Schema<IUserExtra>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    depositedBalance: { type: Number, default: 0 },
    investmentBalance: { type: Number, default: 0 },
    totalProfit: { type: Number, default: 0 },
    kycStatus: { type: String, default: "unverified" },
    // Referral fields
    referralCode: { type: String, unique: true, sparse: true },
    referrer: {
      type: Schema.Types.ObjectId,
      ref: "UserExtra",
      default: null,
    },
    totalReferralBonus: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.UserExtra ||
  model<IUserExtra>("UserExtra", UserExtraSchema);
