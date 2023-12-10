"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getParams = void 0;
const url_1 = __importDefault(require("url"));
function getParams(req) {
    const parsedUrl = url_1.default.parse(req.url, true);
    const pathSegments = parsedUrl.pathname.split('/').filter(segment => segment !== '');
    return {
        action: pathSegments[0],
        model: pathSegments[1]
    };
}
exports.getParams = getParams;
//# sourceMappingURL=getParams.js.map