"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const connection_1 = require("./connection/connection");
const route_1 = require("./route/route");
const server = http_1.default.createServer((req, res) => {
    (0, route_1.route)(req, res);
});
(0, connection_1.databaseConnectionWithRetry)(3).then((res) => {
    console.log("response", res);
    server.listen(connection_1.port, () => {
        console.log(`Server is running on port ${connection_1.port}`);
    });
});
//# sourceMappingURL=server.js.map