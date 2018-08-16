const koa = require('koa');
//const router = require('koa-router');
const url = require('url');
const superagent = require('superagent');
const cheerio = require('cheerio');
const eventproxy = require('eventproxy');

const app = new koa();
const tUrl = 'https://cnodejs.org/';
var topicUrls = [];
var ep = new EventProxy(); //第一步：得到一个 eventproxy 的实例

superagent.get(tUrl)
    .end((err, res) => {
        if (err) {
            return console.log(err);
        }
        var $ = cheerio.load(res.text);
        $('#topic_list .topic_title').each((idx, element) => {
            var $element = $(element);
            var href = url.resolve(tUrl, $element.attr('href'));
            topicUrls.push(href);
        });
        //第二步：定义监听事件的回调函数。
        //after方法为重复监听
        //params: eventname(String) 事件名,times(Number) 监听次数, callback 回调函数
        ep.after('topic_html', topicUrls.length, function (topics) {
            // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
            //.map
            topics = topics.map(function (topicPair) {
                //use cheerio
                var topicUrl = topicPair[0];
                var topicHtml = topicPair[1];
                var $ = cheerio.load(topicHtml);
                return ({
                    title: $('.topic_full_title').text().trim(),
                    href: topicUrl,
                    comment1: $('.reply_content').eq(0).text().trim()
                });
            });
            //outcome
            console.log('outcome:');
            console.log(topics);
        });
        //第三步：确定放出事件消息的
        topicUrls.forEach(function (topicUrl) {
            superagent.get(topicUrl)
                .end(function (err, res) {
                    console.log('fetch ' + topicUrl + ' successful');
                    ep.emit('topic_html', [topicUrl, res.text]);
                });
        });
    });






app.use(async ctx => {

    ctx.body = "hello world";
});
app.listen(3000);

// 常用Api : 
// addClass(className) : 给标签添加class名,方便抓取数据
// text() : 获取标签的文本内容
// find('img') : 查找某类型的标签或者class
// toArray : 可以把一个伪数组变成数组
// each : 循环遍历得到的数组,参数分别是(index,element);

/*今天的话基本上学会了爬虫，不过还有一个问题就是其实爬过来的内容并非是按照
原来内容排版而传过来的，可能是因为异步，先传完都就先传回来了，没准这一点是可以改善的呢
*/