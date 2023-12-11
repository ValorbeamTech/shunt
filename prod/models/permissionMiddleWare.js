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
exports.permissionMiddleWare = void 0;
const connection_1 = require("../connection/connection");
const route_1 = require("../route/route");
const freeRoutes_1 = require("../utils/freeRoutes");
const getParams_1 = require("../utils/getParams");
const sendResponse_1 = require("../utils/sendResponse");
const mongodb_1 = require("mongodb");
function permissionMiddleWare(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { model, action } = (0, getParams_1.getParams)(req);
            const isModelExist = freeRoutes_1.freeRoutes.some((route) => route.model === model);
            const isActionExist = freeRoutes_1.freeRoutes.some((route) => route.action.includes(action));
            if (isModelExist && isActionExist) {
                (0, route_1.route)(req, res);
            }
            else {
                checkForPermission(req, res);
            }
        }
        catch (err) {
            return (0, sendResponse_1.sendResponse)(res, 500, { message: "Error while tyring to check for permissions", data: err });
        }
    });
}
exports.permissionMiddleWare = permissionMiddleWare;
function checkForPermission(req, res) {
    if (req.roleId === 1) {
        checkAdminPermissions(req, res);
    }
    else {
        console.log("role faliled to mact", req.roleId);
    }
}
function checkAdminPermissions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { model, action } = (0, getParams_1.getParams)(req);
            const objectId = new mongodb_1.ObjectId(req.userId);
            const isModelExist = yield connection_1.activeDb.collection("users").findOne({
                _id: objectId,
                "permissions.name": model
            });
            if (isModelExist) {
                const hasPermission = isModelExist.permissions.map((permission) => {
                    if (permission.name === model) {
                        if (permission.list.includes(action)) {
                            (0, route_1.route)(req, res);
                        }
                        else {
                            (0, sendResponse_1.sendResponse)(res, 401, { message: `Unsufficient permission to ${action.toUpperCase()}  ${model}` });
                        }
                    }
                });
            }
            else {
                (0, sendResponse_1.sendResponse)(res, 401, { message: `Permission to ${action.toUpperCase()}  ${model} not found` });
            }
        }
        catch (err) {
            return (0, sendResponse_1.sendResponse)(res, 500, { message: "Error while tyring to check for Admin permissions", data: err });
        }
    });
}
//# sourceMappingURL=permissionMiddleWare.js.map