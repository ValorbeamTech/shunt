import { Router } from "express";
import verifyUserToken from "../middlewares/verifyUserToken";
import { createRole } from "../controllers/roleController";


const roleRouter: Router = Router()

roleRouter.post('/create', verifyUserToken, createRole)



export default roleRouter