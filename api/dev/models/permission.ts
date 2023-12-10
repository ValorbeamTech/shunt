import { Schema, model, Document } from "mongoose";
import { IPermission } from "../@types";
import { auditSchemaValues } from "../util/schema";

const permissionSchema = new Schema<IPermission & Document>({
  name: {
    type: String,
    required: true,
    unique: true
  },
  ...auditSchemaValues

},{
    timestamps: true
});

permissionSchema.plugin(require("mongoose-autopopulate"));

const permissionModel = model<IPermission & Document>("permission", permissionSchema);

export default permissionModel;
