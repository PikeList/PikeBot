const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "deletar",
    aliases: ["delete"],
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
            const reason = r.join(" ")
            db.unset(`${b.id}`).write()
        message.reply("o bot "+b.tag+" foi deletado por "+message.author.tag+" pelo motivo: "+`${reason || "Não especificado"}`)
        if (b.member) {
        message.guild.members.cache.find(a => a.user.id === b.id).kick({ reason: "reprovado"})
        }
        client.channels.cache.get("800879121923833857").send("o bot <@!"+b+`>\`(${b.id})\` foi deletado por ${message.author} com sucesso!\n\`\`\`py\n"${reason || "Não especificado"}"\`\`\``)
        } else {
            message.channel.send("Este bot não está na database!")
            return
        }
}
}