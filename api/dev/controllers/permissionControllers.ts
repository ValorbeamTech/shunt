// permissionService.ts
import { NextFunction, Request, RequestHandler, Response } from "express";
import permissionModel from "../models/permission";

export const createPermission: RequestHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const  { name }  = req.body;
  if (name) {
    try {
      const permissionSaved = await permissionModel.create({ name });
      if (permissionSaved) {
        return res.json({ success: true, message: permissionSaved });
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.json({ success: false, message: error.message });
      }
      return res.json({ success: false, message: error });
    }
  }
};

// export async function getPermission(id: string): Promise<Permission | null> {
//   return Permission.findById(id).exec();
// }

// export async function getAllPermissions(): Promise<Permission[]> {
//   return Permission.find({ deleted: false }).exec();
// }

// export async function updatePermission(id: string, name: string): Promise<Permission | null> {
//   return Permission.findByIdAndUpdate(id, { name }, { new: true }).exec();
// }

// export async function deletePermission(id: string): Promise<Permission | null> {
//   return Permission.findByIdAndUpdate(id, { deleted: true, deletedAt: new Date() }, { new: true }).exec();
// }

// export async function restorePermission(id: string): Promise<Permission | null> {
//   return Permission.findByIdAndUpdate(id, { deleted: false, deletedAt: null }, { new: true }).exec();
// }
