"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUser = void 0;
const env_1 = require("../../../config/env");
const connection_1 = require("../../../connection/connection");
const getDataFromReq_1 = require("../../../utils/getDataFromReq");
const getParams_1 = require("../../../utils/getParams");
const getQuery_1 = require("../../../utils/getQuery");
const sendResponse_1 = require("../../../utils/sendResponse");
const bcryptjs = __importStar(require("bcryptjs"));
const jwt = __importStar(require("jsonwebtoken"));
const createObjectId_1 = require("../../../utils/createObjectId");
function readUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { controller } = (0, getParams_1.getParams)(req);
            switch (controller) {
                case 'id':
                    return getSpecificUser(req, res);
                case 'login':
                    return loginUser(req, res);
            }
        }
        catch (err) {
            const error = { message: err.message, data: err };
            return (0, sendResponse_1.sendResponse)(res, 500, error);
        }
    });
}
exports.readUser = readUser;
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, getDataFromReq_1.getJsonData)(req, res);
            const user = yield connection_1.activeDb.collection("users").findOne({ email: data.email });
            if (!user) {
                return (0, sendResponse_1.sendResponse)(res, 200, { message: "User not found", data: null });
            }
            const check = yield bcryptjs.compare(data.password, user.password);
            if (!check) {
                return (0, sendResponse_1.sendResponse)(res, 200, { message: "Incorrect password", data: null });
            }
            const maxAge = 2000 * 24 * 60 * 60; // 2 days
            const token = jwt.sign({ userId: user._id, email: user.email, roleId: user.roleId }, env_1.SECRET_KEY, { expiresIn: maxAge });
            const { password } = user, userData = __rest(user, ["password"]);
            const response = {
                message: "Login successful",
                data: userData,
                token: token
            };
            // res.setHeader('Set-Cookie', `token=${token}; Max-Age=${maxAge}; HttpOnly`)
            res.setHeader('Set-Cookie', `token=${token}; Max-Age=${maxAge}; HttpOnly; Secure;`);
            return (0, sendResponse_1.sendResponse)(res, 200, response);
        }
        catch (err) {
            const error = { message: err.message, data: err };
            return (0, sendResponse_1.sendResponse)(res, 500, error);
        }
    });
}
function getSpecificUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = (0, getQuery_1.getQuery)(req);
            const newObjectId = (0, createObjectId_1.createObjectId)(id);
            const userDetails = yield connection_1.activeDb.collection("users")
                .findOne({ _id: newObjectId });
            if (userDetails) {
                return (0, sendResponse_1.sendResponse)(res, 200, userDetails);
            }
            else {
                const message = { message: "User not found ", data: null };
                return (0, sendResponse_1.sendResponse)(res, 500, message);
            }
        }
        catch (err) {
            const error = { message: err.message, data: err };
            return (0, sendResponse_1.sendResponse)(res, 500, error);
        }
    });
}
//# sourceMappingURL=readUser.js.map