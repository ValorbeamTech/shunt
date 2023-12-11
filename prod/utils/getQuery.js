"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQuery = void 0;
const url_1 = __importDefault(require("url"));
function getQuery(req) {
    const parsedUrl = url_1.default.parse(req.url || '', true);
    const queryParams = parsedUrl.query;
    return queryParams;
}
exports.getQuery = getQuery;
//# sourceMappingURL=getQuery.js.map