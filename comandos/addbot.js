const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "addbot",
    aliases: ["adicionar", "add"],
    run: async (client, message, args, db) => {
        const msg = await message
        const ch = client.channels.cache.get("800879121923833857")
        const embed = new MessageEmbed()
       // async function a() {
            msg.channel.send('Qual é o id do seu bot?').then(() => {
                const filter = m => msg.author.id === m.author.id;
                msg.channel.awaitMessages(filter, {
                    max: 1,
                    errors: ['time']
                }).then(async(messages) => {
                    const id = messages.first().content
                    const url = `https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=0&scope=bot`
                    embed.setDescription(`[Adicionar](${url})`)
                    //a=async function(id) {
                    let bot = client.users.fetch(id)
                    
                    if (bot instanceof Promise) {
                        await bot.then(a => bot = a).catch(err => bot = null);
                    }
                    
                    /*return bot
                    }
                    let bout;
                    bout = bot*/
                    if (!bot) {
                        message.channel.send("Este bot não existe!")
                        return
                    }
                    if (db.has(bot.id).value()) {
                        msg.channel.send("Você não pode mandar o mesmo bot!")
                        return
                    }
                    
                    db.set(`${bot.id}`, []).write()
                    db.get(`${bot.id}`).push({
                        avatar: bot.avatarURL(),
                        votes: 0,
                        aproved: false,
                        tag: bot.tag,
                        lang: null,
                        ownerId: msg.author.id,
                        id: bot.id
                    }).write()
                    
                    embed.setDescription(embed.description + `\nNome: ${bot.username}`)
                    embed.setThumbnail(bot.displayAvatarURL())
                    msg.channel.send('Qual o comando de ajuda do bot').then(() => {
                        const filter = m => msg.author.id === m.author.id;
                        msg.channel.awaitMessages(filter, {
                            max: 1,
                            errors: ['time']
                        }).then(messag => {
                       const help = messag.first().content
                            embed.addField('Comando De Ajuda', help, true)
                                msg.channel.send('Qual é o prefixo do bot').then(() => {
                                const filter = m => msg.author.id === m.author.id;
                                msg.channel.awaitMessages(filter, {
                                    max: 1,
                                    errors: ['time']
                                }).then(mess => {
                                    const prefix = mess.first().content
                                    embed.addField("Prefixo", prefix)
                                    msg.channel.send('Qual é a linguagem do seu bot? (js, py, dbd)').then(() => {
                                const filter = m => msg.author.id === m.author.id;
                                msg.channel.awaitMessages(filter, {
                                    max: 1,
                                    errors: ['time']
                                }).then(mes => {
                                    db.get(bot.id).find({}).assign({ lang: mes.first().content }).write()
                                    const lang = mes.first().content
                                    msg.channel.send(`Obrigado, agora espere seu bot ser aceito!`)
                                    embed.addField('Linguagem', lang, true)
                                                    embed.setTitle('novo bot enviado')
                
                
                ch.send(embed)
                                }).catch ((err) => {
                                    console.log(err)
                                    msg.channel.send('Tempo Limite Excedido');
                                });
                            });

                        }).catch ((err) => {
                            console.log(err)
                            msg.channel.send('Tempo Limite Excedido');
                        })
                        })
                })
            });
            })
            })
       /* }
        a()*/
    }
}