
import http from 'http'
import { HttpRequest, HttpResponse } from '../config/httpInterface'
import { getParams } from '../utils/getParams'
import { create } from '../controllers/create/create'
import { sendResponse } from '../utils/sendResponse'

export async function route(req: HttpRequest, res: HttpResponse) {
    const { action, model } = getParams(req)
    switch (action) {
        case "create":
            return create(req, res)

        default: return sendResponse(res, 404, { message: "No match case found", data: null })
    }
}

