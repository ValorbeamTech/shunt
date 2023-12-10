import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config'
import { NextFunction, Request, RequestHandler, Response } from 'express'



const verifyUserToken: RequestHandler = (req: Request, res:Response, next:NextFunction) => {
    if (!req.headers.authorization) {
        return res.json({success:false, message:'Unauthorized request'});
      }
      const token = req.headers["authorization"].split(" ")[1];
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === 'string') {
            return res.json({ success: false, message: 'Invalid token' });
          }
          req.user = decoded
        next();
      } catch (err) {
        if(err instanceof Error){
            return res.json({success: false, message: `${err.message} : Invalid token`})
            }
            return res.json({success: false, message: `${err} : Invalid token`})
      }
}

export default verifyUserToken