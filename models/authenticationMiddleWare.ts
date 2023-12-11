import * as jwt from "jsonwebtoken"
import { freeRoutes } from '../utils/freeRoutes'
import { getParams } from "../utils/getParams"
import { HttpRequest, HttpResponse } from "../config/httpInterface"
import { sendResponse } from "../utils/sendResponse"
import { readCookies } from "../utils/readCookies"
import { route } from "../route/route"
import { SECRET_KEY } from "../config/env"
import { permissionMiddleWare } from "./permissionMiddleWare"

export async function authenticationMiddleWare(req: HttpRequest, res: HttpResponse) {
    try {
        const { model, action } = getParams(req)
        const isModelExist = freeRoutes.some((route) => route.model === model)
        const isActionExist = freeRoutes.some((route) =>
            route.action.includes(action)
        )
        if (isModelExist && isActionExist) {
            route(req, res)
        } else {
            verifyToken(req, res)
        }
    } catch (err) {
        return sendResponse(res, 403, { message: "Error during authentication ", data: err })
    }
}

async function verifyToken(req: HttpRequest, res: HttpResponse) {
    try {
        const token = readCookies(req, res)
        if (token === "No cookies") { authorizeWithBearerToken(req, res) } else {
            jwt.verify(token, SECRET_KEY.toString(), (err, userDetails) => {
                if (err) {
                    return sendResponse(res, 403, { message: "Forbidden, try to login" })
                } else {
                    req.roleId = userDetails.roleId
                    req.userId = userDetails.userId
                    permissionMiddleWare(req, res)
                }
            })
        }
    } catch (err) {
        return sendResponse(res, 403, { message: "Failed to verify token", data: err })
    }
}

async function authorizeWithBearerToken(req: HttpRequest, res: HttpResponse) {
    try {

        const authHeader = req.headers["authorization"]
        if (typeof authHeader !== "undefined") {
            const token = authHeader.split(" ")[1]

            jwt.verify(token, SECRET_KEY.toString(), (err, userDetails) => {
                if (err) {
                    return sendResponse(res, 403, { message: "Invalid Bearer token, try to login", data: token })
                } else {
                    req.roleId = userDetails.roleId
                    req.userId = userDetails.userId
                    permissionMiddleWare(req, res)
                }
            })
        } else {
            return sendResponse(res, 403, { message: "Forbidden, try to login" })
        }
    } catch (err) {
        return sendResponse(res, 403, { message: "Error in attempt to verify token", data: err.message })
    }
}