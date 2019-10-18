const express = require('express');
const router = express.Router();
const QRCode = require('qrcode')
const SlackBot = require('slackbots');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/start', function (req, res, next) {
  res.render('start');
});


router.post('/makenewqr', function (req, res, next) {

  const info = req.body.post
  QRCode.toDataURL(info, function (err, srcpic) {
    console.log(srcpic)
    //res.redirect('/showqr')
    res.json({img: srcpic})
    //res.render('showqr', { srcpic })
  })
})

router.get('/slackbot', function (req, res, next) {
  res.render('slackbot')
});


router.post('/sendSlack', function (req, res, next) {

  const slackMessage = req.body.slackmessage

const bot = new SlackBot({
  token: 'xoxb-741349782951-788814471955-94tibWy2AXo3zQdbS2HaLBff',
  name: 'qr spy'
});

// Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':squirrel:'
  };

  bot.postMessage(
    'UMVHYGSP7',
    `${slackMessage}`,

    params
  );


  
});

// Error Handler
bot.on('error', err => console.log(err));

// Message Handler
bot.on('message', data => {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
});
})








// const bot = new SlackBot({
//   token: 'xoxb-741349782951-787500967810-bp7A8zf6amP8U2F0sCJsGfbR',
//   name: 'qr spy'
// });

// // Start Handler
// bot.on('start', () => {
//   const params = {
//     icon_emoji: ':squirrel:'
//   };

//   bot.postMessage(
//     'UMVHYGSP7',
//     'Hi fucker',
//     params
//   );


// });

// // Error Handler
// bot.on('error', err => console.log(err));

// // Message Handler
// bot.on('message', data => {
//   if (data.type !== 'message') {
//     return;
//   }

//   handleMessage(data.text);
// });

  module.exports = router;


