const { MessageEmbed } = require("discord.js")
const ddd = require("quick.db")
const dbd = new ddd.table("v")

module.exports = {
    name: "eval",
    aliases: ["ev", "e"],
    run: async(client, message, args, db) => {
      if (!["334740922891894795"].includes(message.author.id)) return
      
        try {
      let resut = await eval(args.join(" "));
      let result = resut
      
      if (typeof result != "string") {
      resut=require('util').inspect(resut, { depth: 0})
      }
      
      if (resut instanceof Promise) {
          res.then(a => resut = a).catch(a => resut = null)
      }
      
      resut=resut.replace(/\/home\/runner\/hannehbotlist/g, "rapais");
      
      
      if (resut.toString().includes(client.token)) {
          const er = ""
          message.channel.send(`\`\`\`\n${er}\`\`\``)
          return;
      }
      message.channel.send(`${message.author} **|** Resultado:\`\`\`\n${resut}\`\`\``)
}catch(er){
   message.channel.send(`${message.author} **|** Ocorreu um erro :/\`\`\`\n${er.toString().replace(/\/home\/runner\/hannehbotlist/g, "rapais")}\`\`\``)
}
    }
}