const { MessageEmbed } = require("discord.js")
const cd = new Set()
const ms = require("parse-ms")
const ddd = require("quick.db")
const dbd = new ddd.table("v")
const fetch = require("node-fetch")

module.exports = {
    name: "votar",
    aliases: ["vote"],
    run: async (client, message, args, db) => {
        const cuz = client.channels.cache.get("810984085572943913")
        const cucu = message.member.roles.cache.has("803396554592878642")
        const t = dbd.get(message.author.id)
        if (t !== null && 43200000 - (Date.now() - t) > 0) {
        /*if (cd.has(message.author.id)) return*/ 
        let time = ms(43200000 - (Date.now() - t))
        message.channel.send("você ja votou!\nvocê poderá votar novamente "+`daqui \`${time.hours}:${time.minutes}:${time.seconds}\``+"!")
        } else {
        if (!args[0]) return message.channel.send("Coloque o id do bot")
        const id = args[0]
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
        if (!db.get(b.id).value() && db.get(b.id).value().aproved == false) {
            message.channel.send("Este bot não existe ou ainda não foi aprovado!")
        }
        let vote = db.get(b.id).value()[0].votes
        vote = vote + 1
        var bunda = message.createdTimestamp
        db.get(b.id).find({}).assign({ votes: vote }).write()
        cd.add(message.author.id)
        dbd.set(message.author.id, Date.now())
        message.channel.send("Você votou em "+b.username+" com sucesso!")
        if (db.get(b.id).value()[0].whU) {
          const url = db.get(b.id).value()[0].whU
          const msg = {
            "content": /*new MessageEmbed()
            .setTitle("PikeList")
            .setDescription(`${message.author.username}[${message.author.id}] votou em ${b.username}!`)*/`${message.author.username}[${message.author.id}] votou em ${b.username}`
          }
          fetch(url, {
                    "method": "POST",
                    "headers": {"content-type": "application/json"},
                    "body": JSON.stringify(msg)
                    })
        }
        
        if (cucu === true) {
            cuz.send(`${message.author.tag} votou em ${b}, agora ele tem ${db.get(b.id).value()[0].votes} votos`)
        }
        if (cucu === true) {
        setTimeout(() => cuz.send(`${msg.author}, você já pode votar denovo!`),43200000)
}
}
}
}