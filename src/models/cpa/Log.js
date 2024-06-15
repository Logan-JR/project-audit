import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  img: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const logSchema = new Schema(
  {
    modifiedByUser: {
      type: userSchema,
    },
    operationType: {
      type: String,
      required: true,
    },
    where: {
      type: String,
      required: true,
    },
    modifiedDate: {
      type: Date,
      required: true,
    },
    modifiedObject: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Log || model("Log", logSchema);
