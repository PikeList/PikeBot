const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "mute",
    aliases: ["mutar", "silenciar"],
    run: async (client, message, args, db) => {
        if (!message.member.roles.cache.find(a => a.id == "801632583821033513")) return message.channel.send("você não tem perm!")
        const [a, ...r] = args
        const user = message.mentions.members.first()
        const role = message.guild.roles.cache.get("800356550615105536")
        if (user.roles.cache.get(role.id)) return
        if (!user) return
        user.roles.add(role, { reason: r.join(" ")})
        message.channel.send(`o membro ${user.user} foi mutado\n\nMotivo: ${r.join(" ")}`)
}
}