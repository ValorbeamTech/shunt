"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidators = void 0;
const yup_1 = require("yup");
exports.bookValidators = (0, yup_1.object)({
    title: (0, yup_1.string)().required().min(10),
    author: (0, yup_1.string)().required().min(6),
    year: (0, yup_1.string)().required(),
    isbn: (0, yup_1.string)().required().min(7).max(14),
    publisher: (0, yup_1.string)().required(),
    bookStatus: (0, yup_1.string)().required()
});
//# sourceMappingURL=bookValidation.js.map