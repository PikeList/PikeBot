const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "botinfo",
    aliases: ["info", "about"],
    run: async (client, message, args, db) => {
        if (!args[0]) return
        const id = args
        let bot = message.mentions.users.first() || client.users.fetch(id)
    if (bot instanceof Promise) {
        await bot.then(a => bot = a).catch(err => bot = null)
    }
    
    if (!bot) return message.channel.send("bot não encontrado")
    
    const bi = db.get(bot.id).value()
    if (!bi) return message.channel.send("este bot não foi aprovado ainda ou não existe")
    const votes = db.get(bot.id).value()[0].votes
    const tag = db.get(bot.id).value()[0].tag
    const avatar = db.get(bot.id).value()[0].avatar
    let owner = client.users.fetch(db.get(bot.id).value()[0].ownerId)
    let lang = db.get(bot.id).value()[0].lang
    let sd = db.get(bot.id).value()[0].shortDesc
    if (owner instanceof Promise) {
        await owner.then(a => owner = a).catch(err => owner = null)
    }
    
    message.channel.send(new MessageEmbed()
    .setTitle(`<:info:800860389575098379> `+tag)
    .setDescription(`_ _\n<:upvote:801112921450610688> Votos: ${votes}\n<:update:801113085540040767> Enviado por: ${owner.username} [${owner.id}]\n\nLinguagem: ${lang}\n\nDescrição curta: ${sd || "Não definida"}`)
    .setColor(message.guild.members.cache.find(a => a.user.id === bot.id).displayHexColor)
    .setThumbnail(avatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSb1ZoQLZxWJe80SSGk_XrqRQmv2puxjp3u1w&usqp=CAU"))
    }
}