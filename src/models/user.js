import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "USER", enum: ["ADMIN", "USER"] },
});

export default mongoose.model("User", userSchema);
