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
exports.create = void 0;
const getParams_1 = require("../../utils/getParams");
const sendResponse_1 = require("../../utils/sendResponse");
const createUser_1 = require("./createControllers/createUser");
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { model } = (0, getParams_1.getParams)(req);
            switch (model) {
                case "users":
                    return (0, createUser_1.createUser)(req, res);
                default: return (0, sendResponse_1.sendResponse)(res, 404, { message: "No match case found", data: null });
            }
        }
        catch (err) {
            const error = { message: err.message, data: err };
            (0, sendResponse_1.sendResponse)(res, 500, error);
        }
    });
}
exports.create = create;
