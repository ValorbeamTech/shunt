// roleService.ts

import { NextFunction, RequestHandler, Request, Response } from "express";
import roleModel from "../models/role";
import { array } from "fast-web-kit";

export const createRole: RequestHandler = async (req: Request, res: Response, _next:NextFunction) =>  {
    const { name, permissions } = req.body
    if(name && !array.isEmpty(permissions)){
        try {
            const createdRole = await roleModel.create({ name, permissions })
            if(createdRole){
                return res.json({success: true, message: createdRole})
            }

        } catch (error) {
            if (error instanceof Error) {
                return res.json({ success: false, message: error.message });
              }
              return res.json({ success: false, message: error });
        }
    }
  
}

// export const getRole = async (id: string) =>  {
//   return roleModel.findById(id).exec();
// }

// export const getAllRoles: RequestHandler = async ():  => {
//   return roleModel.find({ deleted: false }).exec();
// }

// export const updateRole: RequestHandler = async (id: string, name: string, permissions: string[])=>  {
//   return roleModel.findByIdAndUpdate(id, { name, permissions }, { new: true }).exec();
// }

// export const deleteRole: RequestHandler = async (id: string)=>  {
//   return roleModel.findByIdAndUpdate(id, { deleted: true, deletedAt: new Date() }, { new: true }).exec();
// }

// export const restoreRole: RequestHandler = async (id: string) => {
//   return roleModel.findByIdAndUpdate(id, { deleted: false, deletedAt: null }, { new: true }).exec();
// }
