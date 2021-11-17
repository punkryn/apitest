import express from 'express';
import cheerio from 'cheerio';
// import axios from 'axios';
// import cors from 'cors';

const router = express.Router();

router.post('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const rule1 = "table.gall_list > tbody > tr > td > a";
        // console.log(req.body);
        const $ = cheerio.load(req.body.htmlreq);

        let arr: string[] = [];
        $(rule1).each((index, value) => {
            if(value.attribs.href && !value.attribs.href.startsWith("javascript") && !value.attribs.href.startsWith('http')){
                console.log(value.attribs.href);
                
                arr.push(value.attribs.href);
            }
        });

        res.json(arr);
    } catch(err) {
        console.log('why err');
        console.error(err);
        next(err);
    }
    
});

module.exports = router;
// export default indexRouter;