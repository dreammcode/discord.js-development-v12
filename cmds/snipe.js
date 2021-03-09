const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client,message,args)=> {

    let snip = db.fetch(`msnipe.${message.guild.id}`)

    if(!snip) return message.channel.send(":x: Not found.")
    let embed = new Discord.MessageEmbed()
    .setColor("GREEN")
    for(var i=0;i < snip.length;i++) {

        embed.addField(`Snipe #${i+1}`,`**Content:** \`${snip[i].content.slice(0,100)}\`\n**Author:** <@!${snip[i].author}>\n**Channel:** <#${snip[i].channel}>`)
    }

    message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:["snip"]
}

exports.help = {
    name:"snipe",
    description:"Empty",
    usage:"snipe",
    category:"general"
}