import { Schema, SchemaDefinitionProperty } from "mongoose";

export const auditSchemaValues: Record<string, SchemaDefinitionProperty<any>> = {
  deleted: {
    type: Boolean,
    default: false,
    index: true,
  },
  deletedAt:{
    type: Date,
    default: null
  },
  status: {
    type: String,
    default: "disabled",
    enum: ["active", "disabled", "blocked", "suspended"],
    index: true,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
    autopopulate: { maxDepth: 1 },
    default: null,
    index: true,
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
    autopopulate: { maxDepth: 1 },
    default: null,
    index: true,
  },
};
