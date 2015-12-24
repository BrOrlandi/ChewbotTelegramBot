//Use this if the bots stucks in messages.

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
  console.log("From: "+msg.from.first_name + " " + msg.from.last_name+ " ("+msg.from.username +"): "+ msg.text);

  var fromId = msg.from.id;
  bot.sendMessage(fromId, "Down for maintence.");
});

console.log("Bot running...");
