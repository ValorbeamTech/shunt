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
exports.addBook = void 0;
const sendResponse_1 = require("../../../utils/sendResponse");
const getDataFromReq_1 = require("../../../utils/getDataFromReq");
const bookValidation_1 = require("../../../validations/bookValidation");
const connection_1 = require("../../../connection/connection");
function addBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, getDataFromReq_1.getJsonData)(req, res);
            bookValidation_1.bookValidators.validateSync(data, {
                abortEarly: true,
                stripUnknown: true
            });
            const newBook = yield connection_1.activeDb.collection("books").insertOne(data);
            if (newBook) {
                return (0, sendResponse_1.sendResponse)(res, 201, { message: "New book added", data: newBook });
            }
            else {
                (0, sendResponse_1.sendResponse)(res, 500, { message: "Failed to add new book ", data: newBook });
            }
        }
        catch (err) {
            const error = { message: err.message, data: null };
            return (0, sendResponse_1.sendResponse)(res, 500, error);
        }
    });
}
exports.addBook = addBook;
//# sourceMappingURL=addBook.js.map