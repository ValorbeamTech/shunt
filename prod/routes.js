"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = exports.routing = void 0;
const Crud_1 = require("./src/controllers/Crud");
function routing(endpoint, req, res) {
    const crud = new Crud_1.Crud(req, res);
    switch (endpoint) {
        case 'api':
            sendResponse(res, 200, { "success": true, "message": "Shit!, it works!" });
            break;
        case 'api/users/create':
            let body = '';
            req.on('data', (chunk) => {
                body += chunk;
            });
            req.on('end', () => {
                const data = JSON.parse(body);
                crud.create(data);
            });
            break;
        default:
            sendResponse(res, 404, { "success": false, "message": "Ooops!, route is invalid!" });
            break;
    }
}
exports.routing = routing;
function sendResponse(res, statusCode, data) {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
}
exports.sendResponse = sendResponse;
