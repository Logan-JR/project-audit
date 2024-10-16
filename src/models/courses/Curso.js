import { Schema, model, models } from "mongoose";

export const cursoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    detail: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    hour: {
      type: String,
      required: true,
      trim: true,
    },
    academicHours: {
      type: String,
      required: true,
      trim: true,
    },
    flyer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Curso || model("Curso", cursoSchema);
