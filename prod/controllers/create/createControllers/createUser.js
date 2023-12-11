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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const connection_1 = require("../../../connection/connection");
const sendResponse_1 = require("../../../utils/sendResponse");
const userValidation_1 = require("../../../validations/userValidation");
const getDataFromReq_1 = require("../../../utils/getDataFromReq");
const bcryptjs = __importStar(require("bcryptjs"));
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, getDataFromReq_1.getJsonData)(req, res);
            userValidation_1.userValidators.validateSync(data, {
                abortEarly: true,
                stripUnknown: true
            });
            const isUserExist = yield connection_1.activeDb.collection("users").findOne({ email: data.email });
            if (isUserExist) {
                (0, sendResponse_1.sendResponse)(res, 409, { message: "Email already exist", data: isUserExist });
            }
            else {
                const hashedPassword = yield bcryptjs.hash(data.password, 10);
                const newUser = yield connection_1.activeDb.collection("users").insertOne(Object.assign(Object.assign({}, data), { password: hashedPassword }));
                const response = { message: "New users created", data: newUser };
                (0, sendResponse_1.sendResponse)(res, 200, response);
            }
        }
        catch (err) {
            const error = { message: err.message, data: err };
            return (0, sendResponse_1.sendResponse)(res, 500, error);
        }
    });
}
exports.createUser = createUser;
//# sourceMappingURL=createUser.js.map