"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const http_1 = __importDefault(require("http"));
const config_1 = require("./config");
const routes_1 = require("./routes");
function logInformation(req) {
    console.log(`Request received for ${req.url}`);
}
const app = http_1.default.createServer((req, res) => {
    var _a;
    const cleanUrl = (_a = req.url) === null || _a === void 0 ? void 0 : _a.replace(/^\/+|\/+$/g, '');
    logInformation(req);
    (0, routes_1.routing)(cleanUrl, req, res);
});
function startServer(app) {
    app.listen(config_1.port, config_1.hostname, () => {
        console.log(`App is running on host http://${config_1.hostname} and listening on port ${config_1.port}`);
    });
}
function createCollection(db) {
    db.command({
        collMod: "users",
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['username', 'password', 'createdBy', 'updatedBy'],
                properties: {
                    username: {
                        bsonType: 'string',
                        description: 'must be a string and is required.',
                    },
                    password: {
                        bsonType: 'string',
                        description: 'must be a string and is required.',
                    },
                    createdBy: {
                        bsonType: 'string',
                        description: 'must be a string and is required.',
                    },
                    updatedBy: {
                        bsonType: 'string',
                        description: 'must be a string and is required.',
                    },
                },
            },
        },
        validationAction: "error",
        validationLevel: "strict",
    });
    db.command({
        collMod: "visits",
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['check_in', 'check_out', 'createdBy', 'updatedBy'],
                properties: {
                    check_in: {
                        bsonType: 'string',
                        description: 'must be a string and is required.',
                    },
                    check_out: {
                        bsonType: 'string',
                        description: 'must be a string and is required.',
                    },
                    createdBy: {
                        bsonType: 'string',
                        description: 'must be a string and is required.',
                    },
                    updatedBy: {
                        bsonType: 'string',
                        description: 'must be a string and is required.',
                    },
                    createdAt: {
                        bsonType: 'date',
                        description: 'must be a string and is required.',
                    },
                    updatedAt: {
                        bsonType: 'date',
                        description: 'must be a string and is required.',
                    },
                    deletedAt: {
                        bsonType: 'date',
                        description: 'must be a string and is required.',
                    },
                },
            },
        },
        validationAction: "error",
        validationLevel: "strict",
    });
    db.collection('users').createIndex({ username: 1 }, { unique: true, name: 'username' });
    db.collection('users').createIndex({ email: 1 }, { unique: true, name: 'email' });
    db.collection('users').createIndex({ createdAt: 1 });
    db.collection('users').createIndex({ updatedAt: 1 });
    db.collection('users').createIndex({ deletedAt: 1 });
}
exports.db = {};
(0, config_1.databaseConnectionWithRetry)(3)
    .then((res) => {
    if (res) {
        exports.db = res;
        return createCollection(exports.db);
    }
    throw new Error('Failed to establish database connection.');
})
    .then(() => {
    startServer(app);
})
    .catch((error) => {
    console.error('Failed to establish database connection:', error);
});
