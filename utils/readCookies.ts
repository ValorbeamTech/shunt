import { HttpRequest, HttpResponse } from "../config/httpInterface";
import { sendResponse } from "./sendResponse";

export function readCookies(req: HttpRequest, res: HttpResponse): string {
    try {
        const cookieHeader = req.headers.cookie
        if (cookieHeader) {
            return cookieHeader
        } else { return "No cookies" }

    } catch (err) {
        sendResponse(res, 404, { message: "Error in accessing token", data: req.headers })
    }
}