const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ajuda",
    aliases: ["help", "comandos"],
    run: async (client, message, args, db) => {
        message.channel.send(new MessageEmbed()
        .setTitle("Comandos da "+client.user.username)
        .setDescription(client.commands.map(a => a.name).join(", ")))
}
}