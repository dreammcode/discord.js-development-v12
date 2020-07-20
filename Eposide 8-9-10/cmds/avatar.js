const Discord = require("discord.js")

module.exports.run = async(client,message,args)=> {
   let user;
   if(!args[0]) user = message.author
   if(args[0] && isNaN(args[0])) user = message.mentions.users.first()
   if(args[0] && !isNaN(args[0])){
       user = client.users.cache.get(args[0])

       if(!message.guild.members.cache.has(args[0])) return message.reply(":x: User not found.")

   }

   if(!user.avatarURL()) return message.reply(`:x: ${user.tag} profile photo not found.`)
   let embed = new Discord.MessageEmbed()
   .setColor("RANDOM")
   .setDescription(`[PNG](${user.avatarURL({format: "png"})}) **|** [JPG](${user.avatarURL({format: "jpg"})}) **|** [WEBP](${user.avatarURL({format: "webp"})})`)
   .setImage(user.avatarURL({dynamic: true})+"?size=2048") //Size :D
   .setTimestamp()
   .setAuthor(user.tag,user.avatarURL())

   message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:["av"]
}

exports.help = {
    name:"avatar",
    description:"Show your profile photo",
    usage:"avatar / avatar @user / avatar userID",
    category:"general"
}