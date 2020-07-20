const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client,message,args) => {
    let user;
    if(args[0] &&isNaN(args[0])) user = message.mentions.users.first()
if(args[0] && !isNaN(args[0])){
    user = client.users.cache.get(args[0])

    if(!message.guild.members.cache.has(args[0])) return message.reply(":x: User not found")
}

let reason = args.slice(1).join(" ")
if(!user) return message.reply(":x: You should enter userID or mention user")
if(!reason) reason = "N/A"

message.react("✅")
db.add(`warns.${user.id}`,1)
user.send(`You warned from **${message.guild.name}** named server \n **Reason:**\`${reason}\``)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:[]
}

exports.help = {
    name:"warn",
    description:"Warned user from server",
    usage:"avatar @user / warn userID",
    category:"moderation"
}