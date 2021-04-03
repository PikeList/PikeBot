const { MessageEmbed } = require("discord.js")
const fetch = require("node-fetch")

module.exports = {
    name: "webhook",
    aliases: ["wh", "wb"],
    run: async (client, message, args, db) => {
      const id = args[0]
        
        let bot = message.mentions.users.first() || client.users.fetch(id)
        
                    if (bot instanceof Promise) {
                        await bot.then(a => bot = a).catch(err => bot = null);
                    }
                    
                    if (!bot) {
                        message.channel.send("Este bot não existe!")
                        return
                    }
                    if (!db.has(bot.id).value()) {
                        msg.channel.send("Bot não encontrado")
                        return
                    }
                    
                    if (db.get(bot.id).value()[0].ownerId != message.author.id && message.author.id !== "334740922891894795") return message.channel.send("Este bot não é seu!")
                    
                    message.channel.send(`Envie o link da webhook`).then(() => {
                      const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    errors: ['time']
                }).then(async(messages) => {
                  const url = messages.first().content
                  if (url.length < 120) return
                  db.get(bot.id).find({}).assign({ whU: url }).write()
                  const msg = {
                    "content": "Webhook tested."
                  }
                  fetch(url, {
                    "method": "POST",
                    "headers": {"content-type": "application/json"},
                    "body": JSON.stringify(msg)
                    })
                    message.channel.send("Webhook testada.")
                })
                    })
    }
}