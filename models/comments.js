"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: {
        type: "string",
        required: true
    },
    message: {
        type: "string",
        required: true
    },
    published: {
        type: Date,
        required: false,
        default: Date.now()
    },
    articleId: {
        type: String,
        required: true
    }
});
exports.Comments = (0, mongoose_1.model)("comment", schema);
