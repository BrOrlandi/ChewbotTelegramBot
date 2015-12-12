var TelegramBot = require('node-telegram-bot-api');
var giphy = require('giphy-api')();

var token = process.env.TOKEN || "";

if(token === ""){
    console.log("Use the env var 'TOKEN' to set your Telegram Bot API token.")
    return ;
}

// Setup polling way
var bot = new TelegramBot(token, {polling: true});


bot.onText(/\/start/, function (msg, match) {
  var fromId = msg.from.id;
  bot.sendMessage(fromId, "RRRAARRWHHGWWR!");
});

bot.onText(/\/gif/, function (msg, match) {
  var chatId = msg.chat.id;
  var replyTo = msg.message_id;
  bot.sendChatAction(chatId,'upload_photo');

  giphy.translate('chewbacca').then((res)=>{
    var gif = res.data.images.fixed_height.url;
    console.log("Sending gif "+ gif +" to: "+msg.from.first_name + " " + msg.from.last_name+ " : ");
    //console.log(res.data.images.fixed_height.url);
    bot.sendPhoto(chatId,gif,{reply_to_message_id: replyTo});
    
  });
});



// Any kind of message
bot.on('message', function (msg) {
   if(msg.text.startsWith('/'))
    return;

  var chatId = msg.chat.id;
  console.log("From: "+msg.from.first_name + " " + msg.from.last_name+ " : "+ msg.text);
  bot.sendChatAction(chatId,'record_audio');

  var rand = Math.floor(Math.random()*18)+1;
  var audio = 'sounds/mp3/s'+rand+'.mp3';
  console.log("Sending: " + audio);
  var replyTo = msg.message_id;
  var randTime = Math.floor(Math.random()*1000)+2000;
  console.log("time: " + randTime)
  setTimeout(()=>{
    bot.sendVoice(chatId, audio, {reply_to_message_id: replyTo});
  },randTime);
});

console.log("Chewbacca bot running...");