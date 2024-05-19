import { Schema, model, models } from "mongoose";

const cursoSchema = new Schema(
  {
    course: {
      type: String,
      required: true,
      trim: true,
    },
    modules: {
      type: String,
      required: true,
    },
    academicHours: {
      type: String,
      required: true,
      trim: true,
    },
    courseDate: {
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
