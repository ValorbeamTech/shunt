import { HttpRequest, HttpResponse } from "../../../config/httpInterface"
import { activeDb } from "../../../connection/connection"
import { sendResponse } from "../../../utils/sendResponse"


export async function createUser(req: HttpRequest, res: HttpResponse) {
    try {
        const newUser = await activeDb.collection("users").insertOne({ name: "Bob", age: 12 })
        const response = { message: "New users created", data: newUser }
        sendResponse(res, 200, response)
    } catch (err) {
        const error = { message: err.message, data: err }
        return sendResponse(res, 500, error)
    }
}