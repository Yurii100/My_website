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
const mongoose_1 = require("mongoose");
const articles_1 = require("../models/articles");
function updateArticleImg(id, imgUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.connect)('mongodb://mongodb://127.0.0.1:27017/blog?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4');
            const article = yield articles_1.Articles.findById(id);
            if (article) {
                article.img = imgUrl;
                yield article.save();
                console.log('Изображение успешно обновлено.');
            }
            else {
                console.log('Документ не найден.');
            }
        }
        catch (error) {
            console.error('Ошибка при обновлении изображения:', error);
        }
        finally {
            yield (0, mongoose_1.disconnect)();
        }
    });
}
const objectId = new mongoose_1.Types.ObjectId('67659b262ba5a0a5647d6b1a');
updateArticleImg(objectId, 'http://localhost:3000/img/4xenw3hp.png');
