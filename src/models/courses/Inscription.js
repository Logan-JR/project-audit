import { Schema, model, models } from "mongoose";

const inscriptionSchema = new Schema(
  {
    ci: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    paterno: {
      type: String,
      required: true,
      trim: true,
    },
    materno: {
      type: String,
      trim: true,
    },
    course: {
      type: String,
      required: true,
      trim: true,
    },
    modules: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    inscriptionDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Inscription || model("Inscription", inscriptionSchema);
