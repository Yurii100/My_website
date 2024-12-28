"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articles = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    img: {
        type: "String",
        required: true
    },
    title: {
        type: "string",
        required: true
    },
    anons: {
        type: "string",
        required: true
    },
    full_text: {
        type: "string",
        required: true
    },
});
exports.Articles = (0, mongoose_1.model)("article", schema);
