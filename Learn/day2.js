const url = require('url');
const superagent = require('superagent');
const fs = require('fs');
const cheerio = require('cheerio');
const koa = require('koa');

const app = new koa();
const dir = './images';
const tUrl = 'https://unsplash.com/';

//https://www.pexels.com/ .photo-item__img srcset
//https://pixabay.com/ 


var download = function(src, dir, filename){
    superagent.get(src).pipe(fs.createWriteStream(dir + "/" + filename));
};


superagent.get(tUrl)
    .end((err, res) => {
        if (err) {
            return console.log(err);
        }
        var $ = cheerio.load(res.text);
        $('._2zEKz').each((index, element) => {
            var $src = $(element).attr('srcset');
            console.log("正在下载");
            download($src, dir, Math.floor(Math.random()*1000) + $src.substr(-3,4) + '.jpg');
        });
        console.log("下载完成");
    });






app.use(async ctx => {

    ctx.body = "hello world";
});
app.listen(3000);

//第二天实现的是爬取并下载精美图片