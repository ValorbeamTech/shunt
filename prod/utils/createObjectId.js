"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createObjectId = void 0;
const mongodb_1 = require("mongodb");
function createObjectId(id) {
    try {
        if (id) {
            const newObjectId = new mongodb_1.ObjectId(id.toString());
            return newObjectId;
        }
        else {
            return "";
        }
    }
    catch (err) {
        console.log(err.message);
    }
}
exports.createObjectId = createObjectId;
//# sourceMappingURL=createObjectId.js.map