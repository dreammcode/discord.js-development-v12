const Discord = require("discord.js")

const db = require("quick.db");
require("discord.js")

module.exports.run = async(client,message,args)=> {

    let reason = args.slice(0).join(" ")
    if(db.fetch(`afk.${message.author.id}.${message.guild.id}`)) return message.channel.send("Already have afk ?")
    if(!reason) reason = "N/A"
    if(reason.length >= 128) return message.channel.send("You can use only 128 letter")

    let username = message.member.nickname ? message.member.nickname : message.author.username;

    db.set(`afk.${message.author.id}.${message.guild.id}`,{reason:reason,date:Date.now(),name: username})
    message.channel.send(":ok_hand:")
    if(message.guild.members.cache.get(client.user.id).roles.highest.position > message.member.roles.highest.position){
    message.member.setNickname(`[AFK]: ${username}`).catch(e => console.log(e))
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:[]
}

exports.help = {
    name:"afk",
    description:"",
    usage:"afk [reason]",
    category:"general"
}