'use server'
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot("6381538863:AAHzq7B9WVd7BDfd8IKu7D9HcZe_bczcdcA");

const chatId = -1002013238169;

export const shareProduct = async (image: string, telegramData: String) => {
    try {
        await bot.sendPhoto(chatId, image, { caption: telegramData });
    } catch (error) {
        console.log(error);
    }
}
