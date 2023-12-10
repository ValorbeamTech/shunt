import { HttpRequest, HttpResponse } from "../../config/httpInterface";
import { getParams } from "../../utils/getParams";
import { sendResponse } from "../../utils/sendResponse";
import { createUser } from "./createControllers/createUser";

export async function create(req: HttpRequest, res: HttpResponse) {
    try {
        const { model } = getParams(req)
        switch (model) {
            case "users":
                return createUser(req, res)

            default: return sendResponse(res, 404, { message: "No match case found", data: null })
        }

    } catch (err) {
        const error = { message: err.message, data: err }
        sendResponse(res, 500, error)
    }
}