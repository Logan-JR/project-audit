import { Schema, model, models } from "mongoose";

const moduleSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  academicHours: {
    type: Number,
    required: true,
    min: 1,
  },
});

export const cursoSchema = new Schema(
  {
    course: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    modules: {
      type: [moduleSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Curso || model("Curso", cursoSchema);
