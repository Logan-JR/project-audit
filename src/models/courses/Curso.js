import { Schema, model, models } from "mongoose";

const cursoSchema = new Schema(
  {
    curso: {
      type: String,
      required: true,
      trim: true,
    },
    modulo: {
      type: String,
      required: true,
    },
    horasAcademicas: {
      type: String,
      required: true,
      trim: true,
    },
    fecha: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Curso || model("Curso", cursoSchema);
