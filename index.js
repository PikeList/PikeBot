const { Client, Collection, MessageEmbed } = require('discord.js');


const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('bots.json')
const db = low(adapter)

const client = new Client()

const { env, config } = require('process');
require('dotenv').config();

const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.json(db.get(req.query.id).value() ? db.get(req.query.id).value() : "404")
})
app.get("/abc", async (req, res) => {
    res.json(db.map(a => a).sort(function(a,b){ return a[0].tag.length-b[0].tag.length }).value())
})

app.listen(3000)
const { prefix_p } = require('./config.json');

const fs = require('fs')
client.commands = new Collection();

const commandFiles = fs.readdirSync('./comandos/').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
	const command = require(`./comandos/${file}`);
	client.commands.set(command.name, command);
}
	
client.on('ready', () => {
    let status = [
        `${client.users.cache.filter(a => a.bot).size} Bots`,
        `${client.users.cache.filter(a => !a.bot).size} Humanos`
    ],
    i=0;
    console.log("Hanneh está agora online!")
    setInterval(() => client.user.setActivity(`${status[i++ %status.length]}`, { type: "WATCHING" }),5000);
    setInterval(() => client.channels.cache.get("803298893676281876").messages.fetch("803300005993381939").then(a =>a.edit(`Bots: ${db.size().value()}\n\nBots em verificação: ${db.filter(a => a[0].aproved === false).size().value()}\n\nBots aprovados: ${db.filter(a => a[0].aproved === true).size().value()}`)), 60000)
})


client.on("message", (message) => {
    if (!message.content.startsWith(prefix_p)) return
    const args = message.content.slice(prefix_p.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()
    const commando = client.commands.get(command) || client.commands.find(c => c.aliases && c.aliases.find(alia => alia === command))
	
    if (!commando) return;
    
    commando.run(client, message, args, db)
})

client.on("messageUpdate", (m, msg) => {
    client.emit("message", msg)
})
client.on("guildMemberAdd", (member) => {
    if (member.user.bot) {
        member.roles.add("800356553609183292", { reason: "autorole" })
        client.channels.cache.get("801123014376030268").send(`${member.user.username} adicionado no servidor`)
        if (!db.get(member.user.id).value()) {
            member.roles.add("800357451836686336", { reason: "autorole" })
        } else {
            
        }
    } else {
        //member.roles.add("800356552472789023", { reason: "aurorole" })
        client.channels.cache.get("801123014376030268").send(`${member.user.username} entrou no servidor`)
    }
})

client.on("guildMemberRemove", (member) => {
    if (member.user.bot) {
        client.channels.cache.get("801123014376030268").send(`${member.user.username} removido no servidor`)
        if (!db.get(member.user.id).value()) {
            
        } else {
            db.unset(member.user.id).write()
        }
    } else {
        client.channels.cache.get("801123014376030268").send(`${member.user.username} saiu no servidor`)
    }
})
const { APIMessage, Message } = require('discord.js');

Message.prototype.quote = async(content, options) => {
	const message_reference = {
		message_id:
			(!!content && !options
				? typeof content === 'object' && content.messageID
				: options && options.messageID) || this.id,
		message_channel: this.channel.id
	};

	const allowed_mentions = {
		parse: ['users', 'roles', 'everyone'],
		replied_user:
			typeof content === 'object'
				? content && +content.mention
				: options && +options.mention
	};

	const { data: parsed, files } = await APIMessage.create(
		this,
		content,
		options
	)
		.resolveData()
		.resolveFiles();

	this.client.api.channels[this.channel.id].messages.post({
		data: { ...parsed, message_reference, allowed_mentions },
		files
	});
};



client.login(process.env.TOKEN);
