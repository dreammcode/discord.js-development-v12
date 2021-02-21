const Discord = require("discord.js")
const db = require("quick.db")
module.exports.run = async(client,message,args)=> {

    if(!message.member.hasPermission("MANAGE_CHANNELS")) return;

    if(!db.fetch(`lock.${message.channel.id}`)) return message.reply("This channel already unlocked")

    let msg = await message.channel.send("Loading...")

    try {
        db.delete(`lock.${message.channel.id}`)
        message.channel.updateOverwrite(message.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"),{
            SEND_MESSAGES:true,
            ADD_REACTIONS:true
        })
        msg.edit(":white_check_marker:")

    }catch(e){
        message.channel.send(e)
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:[]
}

exports.help = {
    name:"unlock",
    description:"Empty",
    usage:"embed",
    category:"moderation"
}