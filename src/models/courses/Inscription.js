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
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    paterno: {
      type: String,
      trim: true,
    },
    materno: {
      type: String,
      trim: true,
    },
    correo: {
      type: String,
      unique: true,
      trim: true,
    },
    celular: {
      type: String,
      trim: true,
    },
    grado: {
      type: String,
      trim: true,
    },
    confirmado: {
      type: Boolean,
    },
    curso: {
      type: cursoSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Inscription || model("Inscription", inscriptionSchema);
