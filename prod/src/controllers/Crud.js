"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crud = void 0;
const routes_1 = require("../../routes");
const server_1 = require("../../server");
class Crud {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
<<<<<<< HEAD
                const { username, password } = data.body;
                const createdBy = "user_id";
                const updatedBy = "user_id";
                const createdAt = new Date().toLocaleString();
                const updatedAt = new Date().toLocaleString();
                const email = "";
                const savedData = yield (server_1.db === null || server_1.db === void 0 ? void 0 : server_1.db.collection(data === null || data === void 0 ? void 0 : data.model).insertOne({ username, password, createdBy, updatedBy, createdAt, updatedAt, email }));
                if (savedData === null || savedData === void 0 ? void 0 : savedData.insertedId) {
                    (0, routes_1.sendResponse)(this.res, 200, { "success": true, "message": savedData });
=======
                const { username, password } = data;
                const savedData = yield (server_1.db === null || server_1.db === void 0 ? void 0 : server_1.db.collection(data === null || data === void 0 ? void 0 : data.model).insertOne({ username, password }));
                if (savedData === null || savedData === void 0 ? void 0 : savedData.insertedId) {
                    (0, routes_1.sendResponse)(this.res, 200, { "success": true, "message": savedData.insertedId });
>>>>>>> b9e138efb298ca8653d7ea5c869f17353f606149
                }
                else {
                    (0, routes_1.sendResponse)(this.res, 500, { "success": false, "message": "Internal server error" });
                }
            }
            catch (error) {
                (0, routes_1.sendResponse)(this.res, 400, { "success": false, "message": error.message });
            }
        });
    }
}
exports.Crud = Crud;
