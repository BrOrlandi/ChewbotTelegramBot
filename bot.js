var TelegramBot = require('node-telegram-bot-api');

var token = process.env.TOKEN || "";

if(token === ""){
    console.log("Use the env var 'TOKEN' to set your Telegram Bot API token.")
    return ;
}

// Setup polling way
var bot = new TelegramBot(token, {polling: true});

// Any kind of message
bot.on('message', function (msg) {

  var chatId = msg.chat.id;
  console.log("From: "+msg.from.first_name + " " + msg.from.last_name+ " : "+ msg.text);
  bot.sendChatAction(chatId,'record_audio');

  var rand = Math.floor(Math.random()*18)+1;
  var audio = 'sounds/s'+rand+'.ogg';
  console.log("Sending: " + audio);
  var replyTo = msg.message_id;
  bot.sendVoice(chatId, audio, {reply_to_message_id: replyTo});
});

console.log("Chewbacca bot running...");