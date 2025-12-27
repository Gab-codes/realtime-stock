import { Schema, Document, model, models, Types } from "mongoose";

export interface IReferral extends Document {
  referrer: Types.ObjectId;
  referred: Types.ObjectId;
  amount: number;
  status: "pending" | "awarded" | "revoked";
  awardedAt?: Date;
  transactionId?: string;
}

const ReferralSchema = new Schema<IReferral>(
  {
    referrer: { type: Schema.Types.ObjectId, ref: "UserExtra", required: true },
    referred: { type: Schema.Types.ObjectId, ref: "UserExtra", required: true },
    amount: { type: Number, default: 100 },
    status: {
      type: String,
      enum: ["pending", "awarded", "revoked"],
      default: "pending",
    },
    awardedAt: Date,
    transactionId: String,
  },
  { timestamps: true }
);

export default models.Referral || model<IReferral>("Referral", ReferralSchema);
