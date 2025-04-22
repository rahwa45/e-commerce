import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Client || mongoose.model("Client", UserSchema);
