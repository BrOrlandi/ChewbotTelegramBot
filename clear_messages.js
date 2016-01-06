//Use this if the bots stucks in messages.
var ownerId = process.env.OWNER_ID;

var TelegramBot = require('node-telegram-bot-api');

var token = process.env.TOKEN || "";

if(token === ""){
    console.log("Use the env var 'TOKEN' to set your Telegram Bot API token.")
    return ;
}

// Setup polling way
var bot = new TelegramBot(token, {polling: true});
console.log("owner = "+ownerId);
// Any kind of message
bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  var message = "["+chatId+"]: "+msg.from.first_name + " " + msg.from.last_name+ " ("+msg.from.username +"): "+ msg.text;
  bot.sendMessage(chatId, "Down for maintence.");
  bot.sendMessage(ownerId, message);
  console.log(message);
});

console.log("Bot running...");
