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
exports.getJsonData = void 0;
const sendResponse_1 = require("./sendResponse");
function getJsonData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve, reject) => {
                let data = '';
                req.on('data', (chunk) => {
                    data += chunk;
                });
                req.on('end', () => {
                    resolve(JSON.parse(data));
                });
                req.on('error', (err) => {
                    reject(err);
                });
            });
        }
        catch (err) {
            const error = { message: err.message, data: err };
            (0, sendResponse_1.sendResponse)(res, 500, error);
        }
    });
}
exports.getJsonData = getJsonData;
//# sourceMappingURL=getDataFromReq.js.map