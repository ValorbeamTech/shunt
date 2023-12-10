import { HttpResponse } from "../config/httpInterface"

export function sendResponse(res: HttpResponse, statusCode: number, data: object) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(data))
}