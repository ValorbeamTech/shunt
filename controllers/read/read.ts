import { HttpRequest, HttpResponse } from "../../config/httpInterface";
import { getParams } from "../../utils/getParams";
import { sendResponse } from "../../utils/sendResponse";
import { readUser } from "./read_controllers/readUser";

export async function read(req: HttpRequest, res: HttpResponse) {
    try {
        const { model } = getParams(req)
        switch (model) {
            case "users":
                return readUser(req, res)

            default: return sendResponse(res, 404, { message: "No match case found", data: null })
        }

    } catch (err) {
        const error = { message: err.message, data: err }
        sendResponse(res, 500, error)
    }
}