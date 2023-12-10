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
exports.createUser = void 0;
const connection_1 = require("../../../connection/connection");
const sendResponse_1 = require("../../../utils/sendResponse");
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield connection_1.activeDb.collection("users").insertOne({ name: "Bob", age: 12 });
            const response = { message: "New users created", data: newUser };
            (0, sendResponse_1.sendResponse)(res, 200, response);
        }
        catch (err) {
            const error = { message: err.message, data: err };
            return (0, sendResponse_1.sendResponse)(res, 500, error);
        }
    });
}
exports.createUser = createUser;
