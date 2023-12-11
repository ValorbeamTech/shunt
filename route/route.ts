
import http from 'http'
import { HttpRequest, HttpResponse } from '../config/httpInterface'
import { getParams } from '../utils/getParams'
import { sendResponse } from '../utils/sendResponse'
import { create } from '../controllers/create/create'
import { read } from '../controllers/read/read'

export async function route(req: HttpRequest, res: HttpResponse) {
    const { action, model } = getParams(req)
    switch (action) {
        case "create":
            return create(req, res)

        case "read":
            return read(req, res)

        default: return sendResponse(res, 404, { message: "No match case found", data: null })
    }
}

