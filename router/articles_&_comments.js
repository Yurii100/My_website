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
exports.comment_routes = exports.article_routes = void 0;
const express_1 = require("express");
const articles_1 = require("../models/articles");
const comments_1 = require("../models/comments");
const articleRouter = (0, express_1.Router)();
const commentRouter = (0, express_1.Router)();
;
;
articleRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, anons, full_text, img } = req.body; // Создание переменных на основе свойств тела запроса т.е. req.body
    try {
        const newArticle = new articles_1.Articles({ title, anons, full_text, img }); // Создание экземпляра модели под названием newArticle
        yield newArticle.save(); // Ожидание сохранения нового объекта с данными в базе данных MongoDB
        res.status(201).json(newArticle);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to add article', error });
    }
    ;
}));
commentRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, message, published, articleId } = req.body;
    try {
        const NewComment = new comments_1.Comments({ name, message, published, articleId });
        const result = yield NewComment.save();
        if (!result)
            throw new Error('Мы не можем сохранить запись');
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500);
    }
    ;
}));
articleRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const articles = yield articles_1.Articles.find();
        res.status(200).json(articles);
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch articles',
            error
        });
    }
    ;
}));
articleRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield articles_1.Articles.findOne({ _id: req.params.id });
        if (!article) {
            res.status(404).json({ message: 'Article not found' });
            return;
        }
        res.status(200).json(article);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch article', error });
    }
    ;
}));
commentRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const NewComment = yield comments_1.Comments.find({ articleId: req.params.id }).sort({ published: -1 });
        if (!NewComment)
            throw new Error('No items');
        res.status(200).send(NewComment);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
commentRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield comments_1.Comments.updateOne({ "_id": req.params.id }, { $set: req.body });
        if (!result)
            throw new Error('No items');
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
commentRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield comments_1.Comments.deleteOne({ "_id": req.params.id });
        if (!result)
            throw new Error('No items');
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
exports.article_routes = articleRouter;
exports.comment_routes = commentRouter;
