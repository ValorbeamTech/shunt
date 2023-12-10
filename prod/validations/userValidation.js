"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidators = void 0;
const yup_1 = require("yup");
exports.userValidators = (0, yup_1.object)({
    name: (0, yup_1.string)().required().min(3),
    phone: (0, yup_1.string)().required().min(11),
    email: (0, yup_1.string)().required().email(),
    password: (0, yup_1.string)().required().min(6),
    userStatus: (0, yup_1.string)().required().min(3),
    createdAt: (0, yup_1.date)().required()
});
//# sourceMappingURL=userValidation.js.map