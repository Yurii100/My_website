import { Router, Request, Response } from "express";
import { Articles } from "../models/articles";
import { Comments } from "../models/comments";

const articleRouter = Router(); 
const commentRouter = Router();

interface Article { // Интерфейс для данных статьи 
    title: string; 
    anons: string; 
    full_text: string; 
    img: string;
};

interface Comment {
    name: string;
    message: string;
    published: Date;
    articleId: string;
};

interface RequestParams { id: string; }

articleRouter.post('/', async (req: Request, res: Response) => { // Маршрут для добавления статьи. В данном случаи маршрут '/' указывает на то что он будет доступен по адресу /api/articles благодоря тому что я подключил компонент article_and_comments к пути /api/articles в app.ts
    const { title, anons, full_text, img } = req.body as Article;     // Создание переменных на основе свойств тела запроса т.е. req.body
    try { 
        const newArticle = new Articles({ title, anons, full_text, img });  // Создание экземпляра модели под названием newArticle
        await newArticle.save();                                            // Ожидание сохранения нового объекта с данными в базе данных MongoDB
        res.status(201).json(newArticle); 
    } catch (error) { 
        res.status(500).json({ message: 'Failed to add article', error }); 
    }; 
}); 

commentRouter.post('/', async (req: Request, res: Response) => {
    const { name, message, published, articleId } = req.body as Comment;  
    try {
        const NewComment = new Comments({ name, message, published, articleId });
        const result = await NewComment.save();
        if (!result) throw new Error('Мы не можем сохранить запись');
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(500);
    };
});

articleRouter.get('/', async (req: Request, res: Response) => { 
    try { 
        const articles = await Articles.find(); 
        res.status(200).json(articles); 
    } catch (error) { 
        res.status(500).json({ 
            message: 'Failed to fetch articles', 
            error 
        }); 
    }; 
});

articleRouter.get('/:id', async (req: Request<RequestParams>, res: Response) => { 
    try { 
        const article = await Articles.findOne({ _id: req.params.id }); 
        if (!article) { 
            res.status(404).json({ message: 'Article not found' }); 
            return; 
        }
        res.status(200).json(article); 
    } catch (error) { 
        res.status(500).json({ message: 'Failed to fetch article', error }); 
    }; 
});

commentRouter.get('/:id', async (req: Request<RequestParams>, res: Response) => {
    try {
        const NewComment = await Comments.find({ articleId: req.params.id }).sort({ published: -1 })
        if (!NewComment) throw new Error('No items')
        res.status(200).send(NewComment)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});

commentRouter.put('/:id', async (req: Request<RequestParams>, res: Response) => {
    try {
        const result = await Comments.updateOne({ "_id": req.params.id }, { $set: req.body })
        if (!result) throw new Error('No items')
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});

commentRouter.delete('/:id', async (req: Request<RequestParams>, res: Response) => {
    try {
        const result = await Comments.deleteOne({ "_id": req.params.id })
        if (!result) throw new Error('No items')
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
});

export const article_routes = articleRouter;
export const comment_routes = commentRouter;
