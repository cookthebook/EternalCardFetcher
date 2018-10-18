const commandToken = '!cook'

function isCookCommand (msg) {
  // command_token must be the beginning of the message
  return msg.content.indexOf(commandToken) === 0
}

function getCommand (msg) {
  return msg.content.split(' ')[1]
}

function getArgs (msg) {
  return msg.content.split(' ').slice(2)
}

function getEmoji (emojiName, guild) {
  const emoji = guild.emojis.find(emoji => emoji.name === emojiName)

  return `<:${emoji.name}:${emoji.id}>`
}

module.exports = { getEmoji, isCookCommand, getCommand, getArgs }
