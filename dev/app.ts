import express from 'express';
import { Application } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { article_routes, comment_routes } from './router/articles_&_comments'; 
import { Articles } from "./models/articles";
import { MONGO, PORT } from './config';
import cors from "cors";
import path from 'path';

const connectDB = async () => { 
    try { 
        await mongoose.connect(MONGO); 
        console.log('Подключились к БД'); 
    } catch (err) { 
        console.error('Ошибка подключения к БД:', err); 
        process.exit(1); 
    }
};

connectDB();

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(cors()); 

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/img', express.static(path.join(__dirname, './img')));

app.use('/api/articles', article_routes);
app.use('/api/comments', comment_routes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
