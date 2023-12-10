import Joi from "joi";
import { NextFunction, RequestHandler, Request, Response } from "express";
import { object } from "fast-web-kit";

export const userCreateValidation: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schemaBody = req.body;
  if (!object.isEmpty(schemaBody)) {
    try {
        const schema = Joi.object({
          name: Joi.string().min(3).max(30).required(),
          password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
          email: Joi.string().email().required(),
          phone: Joi.string().min(10).max(10).required(),
        });
        const result = schema.validate(schemaBody);
        return result.error ?  res.json({
          success: false,
          message: result.error.details,
        }): next();
    } catch (error) {
      if (error instanceof Error) {
        return res.json({ success: false, message: error.message });
      }
      return res.json({ success: false, message: error });
    }
  } else {
    return res.json({
      success: false,
      message:
        "No request body provided, please provide one before submit again!",
    });
  }
};
