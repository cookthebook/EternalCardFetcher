require('dotenv').config()

const { createBot } = require('./functional_bot')

const bot = createBot({
  discordBotToken: process.env.DISCORD_BOT_TOKEN,
  onReady: () => console.log('Cook Bot is connected!'),
  responsesForMessage: msg => []
})
bot.connect()
