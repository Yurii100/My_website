import { Schema, model } from "mongoose";

const schema = new Schema({
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

export const Comments = model("comment", schema);