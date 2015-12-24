import os

token =  os.environ.get('TOKEN')

if token is None:
    print("Use the env var 'TOKEN' to set your Telegram Bot API token.")
    exit(0)

import telebot

bot = telebot.TeleBot(token)

@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.reply_to(message, "Down for maintence.")

@bot.message_handler(commands=['audio'])
def send_audio(message):
    audio = open('audio.mp3', 'rb')
    print("sending audio")
    bot.send_audio(message.chat.id, audio)

@bot.message_handler(commands=['image'])
def send_photo(message):
    photo = open('profilepic.jpg', 'rb')
    print("sending photo")
    bot.send_photo(message.chat.id, photo)

@bot.message_handler(func=lambda m: True)
def sendtext(message):
    print(message.from_user.first_name + " : "+ message.text)
    bot.reply_to(message, "Down for maintence.")


print("Bot running.")
bot.polling()
