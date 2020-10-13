const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client,message,args)=> {
    let user;
    if(!args[0]) user = message.author
    if(args[0] && isNaN(args[0])) user = message.mentions.users.first()
    if(args[0] && !isNaN(args[0])){
        user = client.users.cache.get(args[0])
 
        if(!message.guild.members.cache.has(args[0])) return message.reply(":x: User not found.")
 
    }
    if(!user) return message.reply(":x: You must tag a user")

    const number = db.fetch(`number.${user.id}`)
    const warnInfo = db.fetch(`info.${user.id}`)

if(!number || !warnInfo) return message.reply("Doesn't have warn")
const warnembed = new Discord.MessageEmbed()

for(let warnings of warnInfo){
    let mod = warnings.moderator
    let reason = warnings.reason
    let date = warnings.date

warnembed.addField(`${user.tag} warns`,`**Moderator:**${mod} \n Reason:${reason} \n Date:${date}`,true)
}
warnembed.setColor(message.guild.members.cache.get(user.id).roles.highest.color)

message.channel.send(warnembed)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:[]
}

exports.help = {
    name:"warns",
    description:"Look Warns users",
    usage:"warns @user / warns userID",
    category:"moderation"
}