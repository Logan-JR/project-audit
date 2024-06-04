import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    detail: {
      type: String,
      trim: true,
    },
    img: {
      type: String,
      required: true,
    },
    file: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Post || model("Post", postSchema);
