const koa = require('koa');
//const router = require('koa-router');
const url = require('url');
const superagent = require('superagent');
const cheerio = require('cheerio');
const eventproxy = require('eventproxy');

const app = new koa();
const tUrl = 'https://cnodejs.org/';
var topicUrls = [];

async function crawlTitle(){
    var data1 = await new Promise(((resolve) => {
        superagent.get(tUrl)
        .end((err,res) => {
          if(err){
              return console.log(err);
          }
          var $ = cheerio.load(res.text);
          $('#topic_list .topic_title').each((idx, element) => {
              var $element = $(element);
              var href = url.resolve(tUrl, $element.attr('href'));
              topicUrls.push(href);
          });
          resolve(topicUrls);
        });
    }));
    
    
    await topicUrls.map((topic) => {
        superagent.get(topic)
                  .end((err, res) => {
                      var $ = cheerio.load(res.text);
                      var title = $('.topic_full_title');
                      console.log(title);
                  })
    })
}
crawlTitle();

    

//   //第一步：得到一个 eventproxy 的实例
//   var ep = new ventproxy();
//   //第二步：定义监听事件的回调函数。
//   //after方法为重复监听
//   //params: eventname(String) 事件名,times(Number) 监听次数, callback 回调函数
//   ep.after('topic_html', topicUrls.length, function(topics){
//       // topics 是个数组，包含了 40 次 ep.emit('topic_html', pair) 中的那 40 个 pair
//       //.map
//       topics = topics.map(function(topicPair){
//           //use cheerio
//           var topicUrl = topicPair[0];
//           var topicHtml = topicPair[1];
//           var $ = cheerio.load(topicHtml);
//           return ({
//               title: $('.topic_full_title').text().trim(),
//               href: topicUrl,
//               comment1: $('.reply_content').eq(0).text().trim()
//           });
//       });
//       //outcome
//       console.log('outcome:');
//       console.log(topics);
//   });
//   //第三步：确定放出事件消息的
//   topicUrls.forEach(function (topicUrl) {
//       superagent.get(topicUrl)
//           .end(function (err, res) {
//               console.log('fetch ' + topicUrl + ' successful');
//               ep.emit('topic_html', [topicUrl, res.text]);
//           });
//   });
// var userHref = url.resolve(tUrl, $('.reply_author').get(0).attributes.href);
// console.log(userHref);
// console.log($('.reply_author').get(0).children[0].data);
app.use(async ctx => {

    ctx.body = "hello world";
});
app.listen(3000);