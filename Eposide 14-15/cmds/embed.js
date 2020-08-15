const Discord = require("discord.js")

module.exports.run = async(client,message,args)=> {
    /* let text = args.slice(0).join(" ")
     
     if(!text) return message.reply("You must enter a text")

     let embed = new Discord.MessageEmbed()
     .setColor("RANDOM")
     .setDescription(text)
     
     message.channel.send(embed)*/

     let embed = new Discord.MessageEmbed()
     .setTitle("Dream Code")
     .setURL("https://www.youtube.com/channel/UCYePZy8rhZS-NMdM2Fx0yFA")
     .setColor("RANDOM")
     .setAuthor(message.author.tag,message.author.avatarURL())
     .setFooter("Made by Dream Code")
     .setTimestamp()
     .setDescription("Dream Code <3")
     .setThumbnail("https://cdn.discordapp.com/attachments/724983239927922758/733380129966915635/logoo.PNG")
     .setImage("https://cdn.discordapp.com/attachments/724983239927922758/733380181389213796/Banner.png")
     
    

     message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:["em"]
}

exports.help = {
    name:"embed",
    description:"Empty",
    usage:"embed",
    category:"general"
}