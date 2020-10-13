const Discord = require("discord.js")

module.exports.run = async(client,message,args)=> {
     message.reply(`🏓Pong! \n Api ping:**${client.ws.ping}ms**`)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:["p"]
}

exports.help = {
    name:"ping",
    description:"Calcute ping",
    usage:"ping",
    category:"general"
}