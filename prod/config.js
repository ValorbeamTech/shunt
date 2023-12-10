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
exports.databaseConnectionWithRetry = exports.port = exports.hostname = void 0;
const mongodb_1 = require("mongodb");
exports.hostname = "localhost";
exports.port = 1000;
<<<<<<< HEAD
const mongodbConnectionString = "mongodb://localhost:27017";
=======
const mongodbConnectionString = "mongodb://127.0.0.1:27017";
>>>>>>> b9e138efb298ca8653d7ea5c869f17353f606149
const databaseName = "shunt_db";
function databaseConnectionWithRetry(number_retry) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new mongodb_1.MongoClient(mongodbConnectionString);
            yield client.connect();
            console.log("Database connected");
            return client.db(databaseName);
        }
        catch (error) {
            if (number_retry > 0) {
                console.log(`Retrying database connection. Retries left: ${number_retry}`);
                setTimeout(() => {
                    databaseConnectionWithRetry(number_retry - 1);
                }, 3000);
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
