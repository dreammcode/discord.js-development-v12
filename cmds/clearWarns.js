const Discord = require("discord.js")
const db = require("quick.db")
const moment = require("moment")
let random_string = require("randomstring")
module.exports.run = async (client, message, args) => {
    let user;
    if (args[0] && isNaN(args[0])) user = message.mentions.users.first()
    if (args[0] && !isNaN(args[0])) {
        user = client.users.cache.get(args[0])

        if (!message.guild.members.cache.has(args[0])) return message.reply(":x: User not found.")

    }

    if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply(":x: You don't have the required permissions")

    if (!user) return message.channel.send(":x: You must enter userID")
    if (user.bot) return message.channel.send(":x: You can't warn a bot")
    if (user.id == message.author.id) return message.channel.send(":x:")
    //LETS GO

    if (message.guild.members.cache.get(user.id).roles.highest.position > message.member.roles.highest.position) return message.reply(":x: Can't clear warn!")

    let id = args.slice(1).join(" ")
    if (!id) {
        db.delete(`info.${user.id}.${message.guild.id}`)
        message.channel.send(":white_check_mark: Warns deleted.")
    } else {
        let database = db.fetch(`info.${user.id}.${message.guild.id}`)
        if (!database || database == []) return message.channel.send(":x: Didn't have warn")

        if (!database.find(data => data.id === id)) return message.channel.send(":x: Warn not found!")




        database.splice(database.findIndex(data => data.id == id), 1)
if(database.length >= 1){
        db.set(`info.${user.id}.${message.guild.id}`, database)
}else {
    db.delete(`info.${user.id}.${message.guild.id}`)
}
        message.channel.send(":white_check_mark: deleted warn.")
    }
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase: []
}

exports.help = {
    name: "clearWarn",
    description: "Warn users",
    usage: "warn @user reason / warn userID reason",
    category: "moderation"
}