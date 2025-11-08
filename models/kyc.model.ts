import mongoose, { Schema, Document } from "mongoose";

export interface IKYC extends Document {
  userId: string;
  idType: string; // "passport" | "driver_license" | "national_id"
  frontImageUrl: string;
  backImageUrl: string;
  status: "pending" | "approved" | "rejected";
  remarks?: string;
  createdAt: Date;
  updatedAt: Date;
}

const KYCSchema = new Schema<IKYC>(
  {
    userId: { type: String, required: true, unique: true },
    idType: { type: String, required: true },
    frontImageUrl: { type: String, required: true },
    backImageUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    remarks: String,
  },
  { timestamps: true }
);

export const kycModel =
  mongoose.models.KYC || mongoose.model<IKYC>("KYC", KYCSchema);
