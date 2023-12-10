import { ObjectId, Document } from "mongoose";

export interface IAudit extends Document {
  deleted: boolean;
  deletedAt: Date | null;
  status: 'active' | 'disabled' | 'blocked' | 'suspended';
  createdBy: ObjectId;
  updatedBy: ObjectId;
}

export interface IUser extends IAudit {
  name: string;
  phone: string;
  password: string;
  email: string;
  roles: string[];
  permissions: string[];
  profile_picture: string;
}

export interface IRole extends IAudit {
  name: string;
  permissions: string[];
}

export interface IPermission extends IAudit{
  name:string;
}

export type ResponseType = {
  success: boolean
  message: string
}


// Extend the Request interface with a custom interface for the 'user' property
declare module 'express-serve-static-core' {
  interface Request {
    user?: any; // This makes 'user' property available in the Request object
  }
}


