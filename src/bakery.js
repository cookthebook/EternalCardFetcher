const { getArgs, getEmoji } = require('./lib')
// const sqlite3 = require('sqlite3').verbose()

// let cookies_db = new sqlite3.Database('assets/cookies.db', err => {
//   if (err) console.log(err.message)
//   else console.log('Opened cookie database')
// })

function giveCookies (msg) {
  if (msg.mentions.length !== 1) {
    console.log('No mentions')
    return []
  }

  if (msg.mentions[0] === msg.author) {
    return [
      `Cookies can only be given ${getEmoji('hahaha', msg.channel.guild)}`
    ]
  }

  const args = getArgs(msg)

  const cnt = parseInt(args[1])
  if (!cnt) {
    console.log(`Bad cookie count ${cnt}`)
    return []
  }

  return [
    `Okay ${msg.mentions[0].mention}, baking you ${cnt} cookie${
      cnt === 1 ? '' : 's'
    }...`,
    'Baking done! Enjoy.'
  ]
}

function eatCookies (msg) {
  const args = getArgs(msg)
  const cnt = parseInt(args[0])
  if (!cnt) {
    console.log(`Bad eat count ${cnt}`)
    return []
  }
  const eater = msg.author

  return [
    `${eater.mention} ate ${cnt} cookie${cnt === 1 ? '' : 's'}, what a glutton`
  ]
}

module.exports = { giveCookies, eatCookies }
