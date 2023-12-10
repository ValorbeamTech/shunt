import { Schema, model, Document } from "mongoose";
import { IRole } from "../@types";
import { auditSchemaValues } from "../util/schema";

const roleSchema = new Schema<IRole & Document>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  permissions: [
    {
      type: String,
      required: true,
      default: null,
    }
  ],
  ...auditSchemaValues

},{
    timestamps: true
});

roleSchema.plugin(require("mongoose-autopopulate"));

const roleModel = model<IRole & Document>("role", roleSchema);

export default roleModel;
