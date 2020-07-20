
const config = require("../config.json")
module.exports.run = async(client,message,args)=> {
  if(!message.guild) return;
  const msg = message
  const Discord = require("discord.js")
  const db = require("quick.db")
  let prefix = config.prefix

  let codein = args.slice(0).join(" ")
  if(!codein.toLowerCase().includes("token") && !codein.toLowerCase().includes("config")){
      try  {
          let code = eval(codein)

          if(codein.length < 1 && !codein) return message.channel.send(`min. \n\`\`\`javascript\nundefined\n\`\`\``)
          if(typeof code!== "string")
          code = require("util").inspect(code, {depth:0});

          message.channel.send(`min. \n\`\`\`javascript\n${code.length > 1024 ? "Character Over!" : code}\n\`\`\``)
      }catch(e){
        message.channel.send(`min. \n\`\`\`javascript\n${e.length > 1024 ? "Character Over!" : e}\n\`\`\``)
      }
  }else {
    message.channel.send(`min. \n\`\`\`javascript\nundefined token\n\`\`\``) // Prevent take token :)
  }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:["ev"]
}

exports.help = {
    name:"eval",
    description:"Try code",
    usage:"eval <code>",
    category:"owner"
}