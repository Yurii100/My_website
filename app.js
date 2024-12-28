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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const articles___comments_1 = require("./router/articles_&_comments");
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.MONGO);
        console.log('Подключились к БД');
    }
    catch (err) {
        console.error('Ошибка подключения к БД:', err);
        process.exit(1);
    }
});
connectDB();
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/img', express_1.default.static(path_1.default.join(__dirname, './img')));
app.use('/api/articles', articles___comments_1.article_routes);
app.use('/api/comments', articles___comments_1.comment_routes);
app.listen(config_1.PORT, () => {
    console.log(`Server is running on http://localhost:${config_1.PORT}`);
});
