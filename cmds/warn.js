const Discord = require("discord.js")
const db = require("quick.db")
const moment = require("moment")
let random_string = require("randomstring")
module.exports.run = async(client,message,args)=> {
   let user;
   if(args[0] && isNaN(args[0])) user = message.mentions.users.first()
   if(args[0] && !isNaN(args[0])){
       user = client.users.cache.get(args[0])

       if(!message.guild.members.cache.has(args[0])) return message.reply(":x: User not found.")

   }
   
   if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply(":x: You don't have the required permissions")

   if(!user) return message.channel.send(":x: You must enter userID")
   if(user.bot) return message.channel.send(":x: You can't warn a bot")
   if(user.id == message.author.id) return message.channel.send(":x:")
   //LETS GO

if(message.guild.members.cache.get(user.id).roles.highest.position > message.member.roles.highest.position) return message.reply(":x: Can't warn")
   if(!user) return message.reply(":x: You must tag a user")

   let res = args.slice(1).join(" ")

   let warnID = await  
   random_string.generate({
     charset: 'numeric',
     length:8
   });
   

   console.log(`${user.id} warned ID: ${warnID}`)

   message.channel.send("ok")
   db.push(`info.${user.id}.${message.guild.id}`,{moderator:message.author.tag , reason:res ? res : "N/A" , date:moment().format("YYYY-MM-DD"),id:warnID})
   db.add(`number.${user.id}.${message.guild.id}`,1)
   user.send(`You **warned** from **${message.guild.name}** named server \n **Reason:**\`${res ? res : "N/A"}\``)

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:[]
}

exports.help = {
    name:"warn",
    description:"Warn users",
    usage:"warn @user reason / warn userID reason",
    category:"moderation"
}