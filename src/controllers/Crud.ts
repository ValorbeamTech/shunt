import { sendResponse } from "../../routes";
import { db } from "../../server";
import http from 'http';

export interface AggregateOptions{
    model: string
    conditions: any
}

export interface BodyOptions{
    model: string
    body: any
}



export class Crud {
    req: http.IncomingMessage;
    res: http.ServerResponse;

    constructor(req: http.IncomingMessage, res: http.ServerResponse) {
        this.req = req;
        this.res = res;
    }

    async create(data: BodyOptions) {
        try {
           
                const { username, password } = data.body
                const createdBy = "user_id"
                const updatedBy = "user_id"
                const createdAt = new Date().toLocaleString()
                const updatedAt = new Date().toLocaleString()
                const email = ""
                const savedData = await db?.collection(data?.model).insertOne({username, password, createdBy, updatedBy, createdAt, updatedAt, email})
                if (savedData?.insertedId) {
                    sendResponse(this.res, 200, { "success": true, "message": savedData })
                } else {
                    sendResponse(this.res, 500, { "success": false, "message": "Internal server error" })
                }
            
        } catch (error) {
            sendResponse(this.res, 400, { "success": false, "message": (error as Error).message })
        }
    }

    // async update(options: AggregateOptions){}
    // async read(options:AggregateOptions){}
    // async delete(options: AggregateOptions){}
}
