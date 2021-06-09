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


   let mute_role = message.guild.roles.cache.find(e => e.id == "800426179386802197")


   if(!mute_role) return;

   if(!user) return message.channel.send(`You must enter a user`)
   if(user.id == message.author.id) return message.channel.send("Why ?")
   if(user.id == client.user.id) return message.channel.send("Why ?")
   let member = message.guild.members.cache.get(user.id)
   if(!member) return message.channel.send("member not found")

   if(member.roles.highest.position >= message.guild.members.cache.get(client.user.id).roles.highest.position) return message.channel.send("I cannot mute.")
   if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send("You cannot mute.")
   if(message.guild.owner.user.id == user.id) return message.channel.send(`I cannot mute`)
let reason = args.slice(1).join(" ")

if(!reason) reason = "N/A"
if(reason.length >= 256) return message.channel.send("max 256")
let roles = []
   member.roles.cache.forEach(async i => {

    if(i.name !== "@everyone"){
       roles.push(i.id)
       console.log(i.id)
      await member.roles.remove(i.id)
    }else {
        console.log("false")
    }
    })

console.log(roles)
   db.set(`muted.${user.id}`,{moderator:message.author.id,roles:roles,date:Date.now(),reason:reason})
   member.roles.add(mute_role.id)

   message.channel.send(":white_check_mark:")

}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:["hmute"]
}

exports.help = {
    name:"hardmute",
    description:"Show your profile photo",
    usage:"hardmute",
    category:"moderation"
}