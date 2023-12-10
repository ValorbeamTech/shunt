// routes/index.ts
import express, { Router } from "express"
import userRouter from "./userRoutes"
import roleRouter from "./roleRoutes"
import permissionRouter from "./permissionRoutes"


const router: Router = express.Router()

// users
router.use("/users", userRouter)

// roles
router.use("/roles", roleRouter)

// permissions
router.use("/permissions", permissionRouter)


export default router
