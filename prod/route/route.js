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
exports.route = void 0;
const getParams_1 = require("../utils/getParams");
const create_1 = require("../controllers/create/create");
const sendResponse_1 = require("../utils/sendResponse");
function route(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { action, model } = (0, getParams_1.getParams)(req);
        switch (action) {
            case "create":
                return (0, create_1.create)(req, res);
            default: return (0, sendResponse_1.sendResponse)(res, 404, { message: "No match case found", data: null });
        }
    });
}
exports.route = route;
//# sourceMappingURL=route.js.map