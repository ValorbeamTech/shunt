"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePermissions = void 0;
const modelsList_1 = require("./modelsList");
function generatePermissions(roleId) {
    try {
        switch (roleId) {
            case 1:
                return generateAdminPermisions();
            default: return generateAdminPermisions();
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.generatePermissions = generatePermissions;
function generateAdminPermisions() {
    let permissions = [];
    modelsList_1.modelsList.map((model, index) => {
        permissions.push({
            id: index,
            name: model,
            list: ["create", "read", "update", "remove"]
        });
    });
    return permissions;
}
//# sourceMappingURL=generatePermissions.js.map