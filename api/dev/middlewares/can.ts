import { Request, Response, NextFunction } from "express";
import userModel from "../models/user";
import { getUserPermissions } from "../util/user_helpers";

const can =  (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.foundUser._id; // Assuming you have set the authenticated user's ID in the request
    try {
      const user = await userModel.findById(userId);

      if (!user) {
        return res.json({ success: false, message: "User not found." });
      }

      const userPermissions = await getUserPermissions(userId);

      // Check if the user's permissions have the required permission
      if (!userPermissions.includes(requiredPermission)) {
        return res.json({
          success: false,
          message:
            "You do not have the required permission to access this resource.",
        });
      }

      next();
    } catch (err) {
      if (err instanceof Error) {
        return res.json({
          success: false,
          message: `${err.message} : Internal server error`,
        });
      }
      return res.json({
        success: false,
        message: `${err} : Internal server error`,
      });
    }
  };
};

export default can;
