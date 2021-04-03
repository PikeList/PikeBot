const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "desc",
    aliases: ["sd", "d"],
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
                    
                    message.channel.send(`Escreva a descrição curta de seu bot( 300 character max. )`).then(() => {
                      const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    errors: ['time']
                }).then(async(messages) => {
                  const url = messages.first().content
                  if (url.length > 300) return message.channel.send("A descrição é maior que 300 caractéres")
                  db.get(bot.id).find({}).assign({ shortDesc: url }).write()
                  message.channel.send(`Descrição de ${bot} trocada para \`\`\`js\n${url}\`\`\``)
                })
                    })
    }
}