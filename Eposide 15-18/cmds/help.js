const Discord = require("discord.js")
const config = require("../config.json")
const db = require("quick.db")
module.exports.run = async(client,message,args) => {


let embed = new Discord.MessageEmbed()
.addField("General Commands",`${client.commands.filter(command => command.help.category == "general").map(e => `\`${e.help.name}\``).join(",")}`)
.addField("Moderation Commands",`${client.commands.filter(command => command.help.category == "moderation").map(e => `\`${e.help.name}\``).join(",")}`)
.addField("Fun Commands",`${client.commands.filter(command => command.help.category == "fun").map(e => `\`${e.help.name}\``).join(",")}`)
.setFooter(`${client.user.username} Help Command`,client.user.avatarURL())
.setTitle(`${client.user.username} Commands`)
.setURL("https://discord.gg/PE6R7p6")
.setThumbnail(client.user.avatarURL())
.setColor(message.member.roles.highest.color) // role color
.setDescription(`Prefix:\`${db.fetch(`prefix.${message.guild.id}`) ? db.fetch(`prefix.${message.guild.id}`) : config.prefix}\``)
if(!args[0] || args[0]) return message.channel.send(embed)
}

exports.help = {
    name:"help",
    description:"help",
    usage:"help",
    category:"general"
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:[]
}