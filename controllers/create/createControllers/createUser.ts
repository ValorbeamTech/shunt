import { HttpRequest, HttpResponse } from "../../../config/httpInterface"
import { activeDb } from "../../../connection/connection"
import { sendResponse } from "../../../utils/sendResponse"
import { userValidators } from "../../../validations/userValidation"
import { User } from "../../../models/User"
import { getJsonData } from "../../../utils/getDataFromReq"
import *  as bcryptjs from "bcryptjs"


export async function createUser(req: HttpRequest, res: HttpResponse) {
    try {
        const data = await getJsonData<User>(req, res)

        userValidators.validateSync(data, {
            abortEarly: true,
            stripUnknown: true
        })

        const isUserExist = await activeDb.collection("users").findOne({ email: data.email })

        if (isUserExist) { sendResponse(res, 409, { message: "Email already exist", data: isUserExist }) } else {
            const hashedPassword = await bcryptjs.hash(data.password, 10)
            const newUser = await activeDb.collection("users").insertOne({
                ...data,
                password: hashedPassword
            })
            const response = { message: "New users created", data: newUser }
            sendResponse(res, 200, response)
        }
    } catch (err) {
        const error = { message: err.message, data: err }
        return sendResponse(res, 500, error)
    }
}