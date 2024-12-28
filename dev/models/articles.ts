import { Schema, model } from "mongoose";

const schema = new Schema({
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

export const Articles = model("article", schema);
