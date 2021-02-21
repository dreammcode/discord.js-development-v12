const Discord = require("discord.js")

module.exports.run = async(client,message,args) => {


    if(!args[0]) return message.channel.send(":x: You must enter an ask")
    if(args[0].length < 1) return message.channel.send(":x: You must enter an ask")


    let i = ["Yes","No","Maybe","Maybe not"]

    let y = i[Math.floor(i.length * Math.random())]


    message.channel.send(`:8ball: ${y}`)
}

exports.help = {
    name:"8ball",
    description:"8ball",
    usage:"8ball ask",
    category:"fun"
}
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliase:[]
}