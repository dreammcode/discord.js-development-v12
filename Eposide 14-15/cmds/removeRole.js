const Discord = require("discord.js")

module.exports.run = async(client,message,args)=> {
    let role;
    if(args[1] && isNaN(args[1])) role = message.mentions.roles.first()
    if(args[1] && !isNaN(args[1])){
        role = message.guild.roles.cache.get(args[1])
    }
    let user;
    if(args[0] && isNaN(args[0])) user = message.mentions.users.first()
    if(args[0] && !isNaN(args[0])){
        user = client.users.cache.get(args[0])

        if(!message.guild.members.cache.has(args[0])) return message.reply("User not found")
    }
    if(!user) return message.reply(":x: You must mention a user")
    if(!role) return message.reply(":x: You must mention role")
if(!message.guild.members.cache.get(user.id).roles.cache.has(role.id)) return message.reply(":x:")
    message.guild.members.cache.get(user.id).roles.remove(role.id).catch(e => message.reply(e))
    message.reply("ok")

//addRole @user @role

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:[]
}

exports.help = {
    name:"removeRole",
    description:"removeRole",
    usage:"removeRole",
    category:"moderation"
}