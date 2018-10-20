const { getArgs, getEmoji } = require('./lib')
const fs = require('fs')

const cookieDataFile = 'assets/cookies.json'

let cookieData = JSON.parse(fs.readFileSync(cookieDataFile))
console.log(cookieData)

function saveCookies () {
  fs.writeFileSync(cookieDataFile, JSON.stringify(cookieData))
}

function addCookies (userName, cookieCount) {
  if (cookieData[userName]) {
    cookieData[userName].cookieCount += cookieCount
  } else {
    cookieData[userName] = {
      userName: userName,
      cookieCount: cookieCount >= 0 ? cookieCount : 0
    }
  }
}

function getCookies (userName) {
  if (cookieData[userName]) {
    return cookieData[userName].cookieCount
  } else {
    cookieData[userName] = {
      userName: userName,
      cookieCount: 0
    }
    saveCookies()
    return 0
  }
}

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

  addCookies(msg.mentions[0].mention, cnt)
  saveCookies()

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

  if (getCookies(eater.mention) < cnt) {
    return [`You can't eat that many cookies...`].concat(checkCookies(msg))
  }

  addCookies(eater.mention, -cnt)
  saveCookies()

  return [
    `${eater.mention} ate ${cnt} cookie${cnt === 1 ? '' : 's'}, what a glutton`
  ]
}

function checkCookies (msg) {
  const checker = msg.author
  const count = getCookies(checker.mention)

  return [
    `Okay ${checker.mention}, you have ${count} cookie${
      count === 1 ? '' : 's'
    }.`
  ]
}

module.exports = { giveCookies, eatCookies, checkCookies }
