import url from 'url'
import { HttpRequest } from '../config/httpInterface'

export function getParams(req: HttpRequest): Params {
    const parsedUrl = url.parse(req.url, true)
    const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment !== '')

    return {
        action: pathSegments[0],
        model: pathSegments[1],
        controller: pathSegments[2]
    }
}

interface Params {
    action: String,
    model: String,
    controller: String
}