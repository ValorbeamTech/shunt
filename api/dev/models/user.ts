import { Schema, model, Document } from "mongoose";
import { IUser } from "../@types";
import { auditSchemaValues } from "../util/schema";

const userSchema = new Schema<IUser & Document>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
      default: null,
    },
    
    roles:[{
      type: String,
      default: null
    }],

    permissions:[{
      type: String,
      default: null
    }],

    ...auditSchemaValues,
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(require("mongoose-autopopulate"));

const userModel = model<IUser & Document>("user", userSchema);

export default userModel;
