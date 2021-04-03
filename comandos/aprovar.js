const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "aprovar",
    aliases: ["accept"],
    run: async (client, message, args, db) => {
        if (!message.member.roles.cache.find(a => a.id === "800356546776530974")) return message.channel.send("Você não pode usar este comando!")
        if (!args[0]) return message.channel.send("Coloque o id do bot")
        const [id, ...r] = args
        let b = message.mentions.users.first() || client.users.fetch(id)
        
        if (b instanceof Promise) {
        await b.then(a => b = a).catch(err => b = null);
        }
        
        if (!b) {
            message.channel.send("404 Not found")
            return
        }
        
        if (!b.bot) {
            message.channel.send("este usuario não é um bot")
        }
        
        if (db.get(b.id).find({}).value()) {
            if (db.get(b.id).value()[0].aproved === true) return message.channel.send("este bot já foi aprovado!")
            const reason = r.join(" ")
            db.get(`${b.id}`).find({}).assign({ aproved: true }).write()
        message.reply("o bot "+b.tag+" Foi aprovado por "+message.author.tag+" pelo motivo: "+`${reason || "Não especificado"}`)
        message.guild.members.cache.find(a => a.user.id === db.get(b.id).find({}).value().ownerId).roles.add("800356544762871839", { reason: "aprovado" })
        message.guild.members.cache.find(a => a.user.id === b.id).roles.add("800357320831533076", { reason: "aprovado" })
        client.channels.cache.get("800879121923833857").send(new MessageEmbed()
        .setDescription("o bot <@!"+b+`>\`(${b.id})\` enviado pelo ${client.users.cache.get(db.get(b.id).find({}).value().ownerId)} foi aprovado por ${message.author} com sucesso!\n\`\`\`py\n"${reason || "Não especificado"}"\`\`\``))
        } else {
            message.channel.send("Este bot não está na database!")
            return
        }
    }
}