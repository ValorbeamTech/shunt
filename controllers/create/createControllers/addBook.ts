import { sendResponse } from "../../../utils/sendResponse"
import { HttpRequest, HttpResponse } from "../../../config/httpInterface"
import { Book } from "../../../models/Book"
import { getJsonData } from "../../../utils/getDataFromReq"
import { bookValidators } from "../../../validations/bookValidation"
import { activeDb } from "../../../connection/connection"

export async function addBook(req: HttpRequest, res: HttpResponse) {
    try {
        const data = await getJsonData<Book>(req, res)

        bookValidators.validateSync(data, {
            abortEarly: true,
            stripUnknown: true
        })

        const newBook = await activeDb.collection("books").insertOne(data)
        if (newBook) { return sendResponse(res, 201, { message: "New book added", data: newBook }) } else {
            sendResponse(res, 500, { message: "Failed to add new book ", data: newBook })
        }

    } catch (err) {
        const error = { message: err.message, data: null }
        return sendResponse(res, 500, error)
    }
}