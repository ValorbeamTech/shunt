import { HttpRequest, HttpResponse } from "../config/httpInterface"
import { sendResponse } from "./sendResponse"


export async function getJsonData<T>(req: HttpRequest, res: HttpResponse): Promise<T> {
    //find a way to do not return any
    try {
        return new Promise<T>((resolve, reject) => {
            let data = ''

            req.on('data', (chunk) => {
                data += chunk
            })

            req.on('end', () => {
                resolve(JSON.parse(data))
            });

            req.on('error', (err) => {
                reject(err)
            })
        })
    } catch (err) {
        const error = { message: err.message, data: err }
        sendResponse(res, 500, error)

    }
}