const Eris = require('eris')
const { eatCookies, giveCookies, checkCookies } = require('./bakery')
const { getEmoji, isCookCommand, getCommand } = require('./lib')

const commands = {
  GIVE_COOKIES: 'give',
  EAT_COOKIES: 'eat',
  CHECK_COOKIES: 'check'
}

function createBot ({ discordBotToken, onReady, erisInstance }) {
  const bot = erisInstance || new Eris(discordBotToken)

  function send ({ replyTo, text }) {
    bot.createMessage(replyTo.channel.id, text)
    console.log(`< ${text}`)
  }

  bot.on('ready', onReady)

  bot.on('messageCreate', function (incomingMsg) {
    console.log(`> ${incomingMsg.content}`)
    const responses = parseInput(incomingMsg)
    if (!responses) return
    responses.forEach(text => send({ replyTo: incomingMsg, text }))
  })

  return bot
}

function parseInput (msg) {
  if (!isCookCommand(msg)) return []

  let returnMsgs = ''

  const command = getCommand(msg)
  if (command) {
    console.log(`Got command ${command}`)
  }

  switch (command) {
    case commands.GIVE_COOKIES:
      returnMsgs = giveCookies(msg)
      break
    case commands.EAT_COOKIES:
      returnMsgs = eatCookies(msg)
      break
    case commands.CHECK_COOKIES:
      returnMsgs = checkCookies(msg)
      break
    default:
      returnMsgs = [`Command recieved, ${getEmoji('kek', msg.channel.guild)}`]
  }

  return returnMsgs
}

module.exports = { createBot }
