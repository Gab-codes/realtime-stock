import { Schema, Document, model, models } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name?: string;
  email: string;
  emailVerified?: boolean;
  image?: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    emailVerified: Boolean,
    image: String,
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);
