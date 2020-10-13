const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client,message,args)=> {
     
    let changes = args[0]


    if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have require permissions")
    if(!changes) return message.reply(":x: You must enter a prefix! \n !prefix !!")
    
    if(changes > 1950) return message.reply(":x: Max 1950 characters")

    if(changes < 1) return message.reply(":x: Min 1 character")




    db.set(`prefix.${message.guild.id}`,changes)
    message.channel.send("ok")
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:["p"]
}

exports.help = {
    name:"prefix",
    description:"Change Prefix",
    usage:"prefix",
    category:"moderation"
}