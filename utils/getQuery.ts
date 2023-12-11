import url from 'url'
import { HttpRequest } from '../config/httpInterface'

export function getQuery(req: HttpRequest) {
    const parsedUrl = url.parse(req.url || '', true)
    const queryParams = parsedUrl.query
    return queryParams
}