import { ObjectId } from "mongodb"
import { SECRET_KEY } from "../../../config/env"
import { HttpRequest, HttpResponse } from "../../../config/httpInterface"
import { activeDb } from "../../../connection/connection"
import { User } from "../../../models/User"
import { getJsonData } from "../../../utils/getDataFromReq"
import { getParams } from "../../../utils/getParams"
import { getQuery } from "../../../utils/getQuery"
import { sendResponse } from "../../../utils/sendResponse"
import *  as bcryptjs from "bcryptjs"
import * as  jwt from "jsonwebtoken"
import { createObjectId } from "../../../utils/createObjectId"

export async function readUser(req: HttpRequest, res: HttpResponse) {
    try {
        const { controller } = getParams(req)
        switch (controller) {
            case 'id':
                return getSpecificUser(req, res)

            case 'login':
                return loginUser(req, res)
        }
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
        // res.setHeader('Set-Cookie', `token=${token}; Max-Age=${maxAge}; HttpOnly`)
        res.setHeader('Set-Cookie', `token=${token}; Max-Age=${maxAge}; HttpOnly; Secure;`);

        return sendResponse(res, 200, response)

    } catch (err) {
        const error = { message: err.message, data: err }
        return sendResponse(res, 500, error)
    }
}


async function getSpecificUser(req: HttpRequest, res: HttpResponse) {
    try {
        const { id } = getQuery(req)
        const newObjectId = createObjectId(id)
        const userDetails = await activeDb.collection("users")
            .findOne({ _id: newObjectId })

        if (userDetails) { return sendResponse(res, 200, userDetails) } else {
            const message = { message: "User not found ", data: null }
            return sendResponse(res, 500, message)
        }

    } catch (err) {
        const error = { message: err.message, data: err }
        return sendResponse(res, 500, error)
    }
}