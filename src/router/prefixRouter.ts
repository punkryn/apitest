import express from 'express';
import cheerio from 'cheerio';

const router = express.Router();

router.post('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const $ = cheerio.load(req.body.prefix);
        let htmlTitle = $("div.view_content_wrap > header > div > h3> span.title_subject").text();
        console.log("title: " + htmlTitle);

        let isIncluded = htmlTitle.includes("ㅇㅎ")
        
        let arr: string[] = [];
        if(isIncluded){
            console.log('included');
            $("div.writing_view_box > div > p > img").each((index, value) => {
                console.log(value.attribs.src);
                arr.push(value.attribs.src);
            })

            if(!arr.length){
                $("div.writing_view_box > div > div > img").each((index, value) => {
                    console.log(value.attribs.src);
                    arr.push(value.attribs.src);
                })
            }
        } else {
            
        }

        res.json(arr);
    } catch(err) {
        console.log('why err');
        console.error(err);
        next(err);
    }
    
});

module.exports = router;