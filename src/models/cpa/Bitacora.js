import { Schema, model, models } from "mongoose";

const bitacoraSchema = new Schema(
  {
    modifiedByUser: {
      type: Schema.Types.Mixed,
    },
    operationType: {
      type: String,
    },
    log: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Bitacora || model("Bitacora", bitacoraSchema);
