const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client,message,args)=> {

    let embed = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setFooter("Made by Dream Code")
    .setTimestamp()
    .setAuthor(message.author.tag,message.author.avatarURL())
    .setDescription(`**Your Coin:**\`${db.fetch(`coin.${message.author.id}`)}\` \n **Coal Role:** \`Balance:10 , !!shop coal\``)
    if(!args[0] && args[0] !== "coal") return message.channel.send(embed)

    if(args[0] == "coal"){
        let role = message.guild.roles.cache.find(role => role.id == "729270330098581544")
        if(db.fetch(`coin.${message.author.id}`) < 10) return message.reply("xD You don't have enough money to buy")
        if(message.member.roles.cache.has(role.id)) return message.reply("You have already coal role")

        db.add(`coin.${message.author.id}`,-10)

//ummm 
        message.member.roles.add(role.id)
        message.channel.send("ok")

    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:[]
}

exports.help = {
    name:"shop",
    description:"Empty",
    usage:"shop",
    category:"general"
}