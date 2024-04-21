import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: {
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
    max: 16,
  },
  phone: {
    type: String,
    min: 8,
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
    default: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.User || model("User", userSchema);
