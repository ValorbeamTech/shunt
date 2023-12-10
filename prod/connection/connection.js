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
exports.databaseConnectionWithRetry = exports.activeDb = exports.databaseName = exports.hostname = exports.port = void 0;
const { MongoClient, Db } = require("mongodb");
exports.port = 1000;
exports.hostname = "localhost";
exports.databaseName = "shunt_db";
const mongodbConnectionString = "mongodb://127.0.0.1:27017";
exports.activeDb = null;
function databaseConnectionWithRetry(number_retry) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new MongoClient(mongodbConnectionString);
            yield client.connect();
            exports.activeDb = client.db(exports.databaseName);
            return client.db(exports.databaseName);
        }
        catch (error) {
            if (number_retry > 0) {
                return new Promise((resolve) => {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        resolve(yield databaseConnectionWithRetry(number_retry - 1));
                    }), 3000);
                });
            }
            else {
                if (error instanceof Error) {
                    console.log(`Database error: ${error.message}`);
                }
                else {
                    console.log(`Database error: ${error}`);
                }
            }
        }
    });
}
exports.databaseConnectionWithRetry = databaseConnectionWithRetry;
