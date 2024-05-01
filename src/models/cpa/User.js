import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    max: 12,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  phone: {
    type: String,
    min: 7,
  },
  role: {
    type: String,
    required: true,
    default: "admin",
  },
  status: {
    type: String,
    required: true,
    default: "active",
  },
  img: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.User || model("User", userSchema);
