import { Schema, model, models } from "mongoose";

const gallerySchema = new Schema(
  {
    detail: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Gallery || model("Gallery", gallerySchema);
