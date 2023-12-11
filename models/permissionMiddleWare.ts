import { HttpRequest, HttpResponse } from "../config/httpInterface"
import { activeDb } from "../connection/connection"
import { route } from "../route/route"
import { freeRoutes } from "../utils/freeRoutes"
import { getParams } from "../utils/getParams"
import { sendResponse } from "../utils/sendResponse"
import { ObjectId } from 'mongodb'

export async function permissionMiddleWare(req: HttpRequest, res: HttpResponse) {
    try {
        const { model, action } = getParams(req)
        const isModelExist = freeRoutes.some((route) => route.model === model)
        const isActionExist = freeRoutes.some((route) =>
            route.action.includes(action)
        )
        if (isModelExist && isActionExist) {
            route(req, res)
        } else {
            checkForPermission(req, res)
        }
    } catch (err) {
        return sendResponse(res, 500, { message: "Error while tyring to check for permissions", data: err })
    }
}

function checkForPermission(req: HttpRequest, res: HttpResponse) {
    if (req.roleId === 1) {
        checkAdminPermissions(req, res)
    } else {
        console.log("role faliled to mact", req.roleId)
    }

}

async function checkAdminPermissions(req: HttpRequest, res: HttpResponse) {
    try {
        const { model, action } = getParams(req)
        const objectId = new ObjectId(req.userId)

        const isModelExist = await activeDb.collection("users").findOne({
            _id: objectId,
            "permissions.name": model
        })

        if (isModelExist) {
            const hasPermission = isModelExist.permissions.map((permission) => {
                if (permission.name === model) {
                    if (permission.list.includes(action)) {
                        route(req, res)
                    } else {
                        sendResponse(res, 401, { message: `Unsufficient permission to ${action.toUpperCase()}  ${model}` })
                    }
                }
            })
        } else {
            sendResponse(res, 401, { message: `Permission to ${action.toUpperCase()}  ${model} not found` })
        }


    } catch (err) {
        return sendResponse(res, 500, { message: "Error while tyring to check for Admin permissions", data: err })
    }
}