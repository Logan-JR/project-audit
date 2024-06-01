import { Schema, model, models } from "mongoose";
import { cursoSchema } from "@/models/courses/Curso";

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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    course: {
      type: [cursoSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Inscription || model("Inscription", inscriptionSchema);
