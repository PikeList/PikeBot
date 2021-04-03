const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "top",
    aliases: ["leaderboard"],
    run: async (client, message, args, db) => {
        users = [];
client.users.cache.filter(a => a.bot && db.get(a.id).value() && db.get(a.id).value()[0].votes > 0).forEach((a) => {
    if (users.size >= 10) return
users.push([a.username, db.get(a.id).value()[0].votes])
})

users = users.sort(function(a, b) { return b[1] - a[1] }).map((res, i) => `[${i + 1}] ${res[0]} - ${res[1]} Votos`)
message.reply(new MessageEmbed()
.setTitle("Placar de votos")
.setDescription(users.join("\n"))
.setFooter(`Ganhador: ${users[0]}`))
    }
}