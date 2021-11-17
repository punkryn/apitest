import morgan from 'morgan';
import express from 'express';
import path from 'path';
import cors from 'cors';

const app: express.Application = express();
const port: number = Number(process.env.PORT) || 3001;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'));

app.use(cors({
    origin: true,
    credentials: true,
}));
app.use(express.json({limit: '50mb'}));
app.use(cors({
    methods: ['GET', 'POST'],
    credentials: true,
    origin: 'http://localhost:3000',
}));

const indexRouter = require('./router/indexRouter');
app.use('/', indexRouter);

const titleRouter = require('./router/titleRouter');
app.use('/title', titleRouter);

const prefixRouter = require('./router/prefixRouter');
app.use('/prefix', prefixRouter);

app.get('/test', (req: express.Request, res: express.Response) => {
    res.json({
        "decode": decodeURIComponent("%EC%9C%A4%ED%98%B8%EC%A4%91"),
    });
});

app.use('*', (err: express.ErrorRequestHandler, req: express.Request, res: express. Response, next: express.NextFunction) => {
    console.log('why');
    res.status(500).render('error', { err });
});

app.listen(port, () => {
    console.log(`Example app listening at http://loaclhost:${port}`);
})