import { Schema, model, models } from "mongoose";

const kardexSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    apellidoPaterno: {
      type: String,
      required: true,
      trim: true,
    },
    apellidoMaterno: {
      type: String,
      required: true,
      trim: true,
    },
    ci: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    ru: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default models.Kardex || model("Kardex", kardexSchema);
