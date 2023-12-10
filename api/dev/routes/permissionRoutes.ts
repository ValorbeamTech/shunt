import { Router } from "express";
import verifyUserToken from "../middlewares/verifyUserToken";
import { createPermission } from "../controllers/permissionControllers";


const permissionRouter: Router = Router()

permissionRouter.post('/create', verifyUserToken, createPermission)

export default permissionRouter