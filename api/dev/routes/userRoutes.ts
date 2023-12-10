import { Router } from "express";
import { assignPermission, assignRole, createUser, getUsers, loginUser } from "../controllers/userControllers";
import { userCreateValidation } from "../validation/userValidation";
import verifyUserToken from "../middlewares/verifyUserToken";
import can from "../middlewares/can";


const userRouter: Router = Router()

userRouter.post('/create', userCreateValidation, createUser)
userRouter.post('/login', loginUser)
userRouter.get('/read', verifyUserToken, can("admin-super"), getUsers)
userRouter.post('/assign-roles', verifyUserToken, assignRole)
userRouter.post('/assign-permissions', verifyUserToken, assignPermission)



export default userRouter


