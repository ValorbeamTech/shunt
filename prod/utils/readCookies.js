"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCookies = void 0;
const sendResponse_1 = require("./sendResponse");
function readCookies(req, res) {
    try {
        const cookieHeader = req.headers.cookie;
        if (cookieHeader) {
            return cookieHeader;
        }
        else {
            return "No cookies";
        }
    }
    catch (err) {
        (0, sendResponse_1.sendResponse)(res, 404, { message: "Error in accessing token", data: req.headers });
    }
}
exports.readCookies = readCookies;
//# sourceMappingURL=readCookies.js.map