import { SECRET_KEY } from "../../../config/env"
import { HttpRequest, HttpResponse } from "../../../config/httpInterface"
import { activeDb } from "../../../connection/connection"
import { User } from "../../../models/User"
import { getJsonData } from "../../../utils/getDataFromReq"
import { getQuery } from "../../../utils/getQuery"
import { sendResponse } from "../../../utils/sendResponse"
import *  as bcryptjs from "bcryptjs"
import * as  jwt from "jsonwebtoken"

export async function readUser(req: HttpRequest, res: HttpResponse) {
    try {
        const { id, login } = getQuery(req)
        if (id) { }
        else if (login) { loginUser(req, res) }

    } catch (err) {
        const error = { message: err.message, data: err }
        return sendResponse(res, 500, error)
    }
}

async function loginUser(req: HttpRequest, res: HttpResponse) {
    try {
        const data = await getJsonData<User>(req, res)

        const user = await activeDb.collection("users").findOne({ email: data.email })
        if (!user) {
            return sendResponse(res, 200, { message: "User not found", data: null })
        }

        const check = await bcryptjs.compare(data.password, user.password);

        if (!check) {
            return sendResponse(res, 200, { message: "Incorrect password", data: null })
        }
        const maxAge = 2000 * 24 * 60 * 60; // 2 days
        const token = jwt.sign(
            { userId: user._id, email: user.email, roleId: user.roleId },
            SECRET_KEY,
            { expiresIn: maxAge }
        );
        const { password, ...userData } = user
        const response = {
            message: "Login successful",
            data: userData,
            token: token
        }
        res.setHeader('Set-Cookie', `token=${token}; Max-Age=${maxAge}; HttpOnly`)
        return sendResponse(res, 200, response)

    } catch (err) {
        const error = { message: err.message, data: err }
        return sendResponse(res, 500, error)
    }
}