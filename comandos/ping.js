const { MessageEmbed } = require('discord.js')
const date = new Date()
module.exports = {
  name: "ping",
  aliases: ["latencia"],
  run: async(client, message, args, db) => {

let kau = await message.channel.send("cu").then(m => m.delete())

 message.quote(`Bot \`${client.ws.ping}ms\` \nAPI: \`${kau.createdTimestamp - message.createdTimestamp}ms\``)
  }
}