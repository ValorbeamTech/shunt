import { NextFunction, RequestHandler, Request, Response } from "express";
import userModel from "../models/user";
import bcrypt from "bcrypt";
import { array } from "fast-web-kit";
import { JWT_SECRET } from "../config";
import jwt from "jsonwebtoken";
import roleModel from "../models/role";

export const getUsers: RequestHandler = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const user = await userModel.find()
    if (array.isEmpty(user)) {
      return res.json({ success: false, message: "No records found!" });
    }
    return res.json({ success: true, message: user });
  } catch (error) {
    if (error instanceof Error) {
      return await res.json({ success: false, message: error.message });
    }
    return await res.json({ success: false, message: error });
  }
};

export const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { name, phone, email, password } = req.body;
  try {
    const user = new userModel();
    user.name = name;
    user.phone = phone;
    user.email = email;
    user.password = await bcrypt.hash(password, 10);
    const savedUser = await user.save();
    if (savedUser) {
      return res.json({ success: true, message: savedUser });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.json({ success: false, message: error.message });
    }
    return res.json({ success: false, message: error });
  }
};

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    //check if user exists
    const foundUser: any = await userModel.findOne({ email: email });
    if (!foundUser) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    //check if password is correct
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid email or password" });
    }
    //create token
    const token = jwt.sign({ foundUser }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ success: true, message: { token: token } });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({ success: false, message: error.message });
    }
    return res.json({ success: false, message: error });
  }
};


export const assignRole: RequestHandler = async (req: Request, res: Response, _next:NextFunction) => {
  try {
    // Access the decoded user data from req.user directly
    const user = req.user; // Assuming you have defined the User interface for the userModel

    const userFound = await userModel.findById(user.foundUser._id);
    if (!userFound) {
      return res.json({ success: false, message: "User not found." });
    }

    const { roleNames } = req.body;

    if (!Array.isArray(roleNames) || roleNames.length === 0) {
      return res.json({ success: false, message: "Can't assign empty roles!" });
    }

    for (const roleData of roleNames) {
      const { name } = roleData;

      // Find the role by name from the roleModel
      const role = await roleModel.findOne({ name });

      if (role) {
        if (!userFound.roles.includes(role.name)) {
          // Add the role name to the user's roles array
          userFound.roles.push(role.name);

          // Merge the role's permissions with the user's permissions (avoid duplicates)
          userFound.permissions = Array.from(new Set([...userFound.permissions, ...role.permissions]));
      } else {
        // Handle the case where the role name is not found in the roleModel
        return res.json({ success: false, message: `Role '${name}' already assigned to a user.` });
      }
    }
  }
    await userFound.save(); // Save the updated user

    return res.json({ success: true, message: "Roles assigned successfully!" });
  } catch (error) {
    return res.json({ success: false, message: "Error assigning roles." });
  }
}
 

export const assignPermission: RequestHandler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const userId = req.user.foundUser._id
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }
    const  permission  = req.body;
    // Assign the permission to the user if not already assigned
    if (permission.name && !user.permissions.includes(permission.name)) {
      user.permissions.push(permission.name);
      // Save the updated user
      const assignedPermission = await user.save();
      if (assignedPermission) {
        return res.json({ success: true, message: assignedPermission });
      }
    }
    return res.json({ success: false, message: "Permission already exists!" });
  } catch (error) {
    if (error instanceof Error) {
      return res.json({ success: false, message: error.message });
    }
    return res.json({ success: false, message: error });
  }
};
