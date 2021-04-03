module.exports = {
    name: "update",
    aliases: ["atualizar"],
    run: async(client, message, args, db) => {
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
        
        
                    db.get(`${bot.id}`).find({}).assign({
                        avatar: bot.avatarURL(),
                        tag: bot.tag
                    }).write()
                    message.quote("Bot atualizado")
    }
}