import { sendResponse } from "../../routes";
import { db } from "../../server";
import http from 'http';



export class Crud {
    req: http.IncomingMessage;
    res: http.ServerResponse;

    constructor(req: http.IncomingMessage, res: http.ServerResponse) {
        this.req = req;
        this.res = res;
    }

    async create(data: any) {
        try {
            const { username, password } = data
            const savedData = await db?.collection(data?.model).insertOne({username, password});
            if (savedData?.insertedId) {
                sendResponse(this.res, 200, { "success": true, "message": savedData.insertedId });
            } else {
                sendResponse(this.res, 500, { "success": false, "message": "Internal server error" });
            }
        } catch (error) {
            sendResponse(this.res, 400, { "success": false, "message": (error as Error).message });
        }
    }
}
