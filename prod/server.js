"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
function logInformation(req, _res, next) {
    console.log(`Request received for ${req.url}`);
    next();
}
const app = http_1.default.createServer((_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify({ success: true, message: "Hello, world!" }));
});
app.on("request", (req, res) => {
    logInformation(req, res, () => { });
});
(0, config_1.databaseConnectionWithRetry)(3)
    .then(() => {
    app.listen(config_1.port, () => console.log(`App is running on host http://${config_1.hostname} and listening on port ${config_1.port}`));
})
    .catch((error) => {
    console.error("Failed to establish database connection:", error);
});
