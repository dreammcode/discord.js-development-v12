const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client,message,args)=> {

    let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(message.author.tag,message.author.avatarURL())
    .setDescription(`LeveL:${db.fetch(`level.${message.author.id}`) || "0"} \n XP:${db.fetch(`xp.${message.author.id}`) || "0"}`)

    message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:["ra"]
}

exports.help = {
    name:"rank",
    description:"Empty",
    usage:"rank",
    category:"general"
}