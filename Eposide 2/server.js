const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")
const db = require("quick.db")
client.on("ready", () => {
    console.log(`Logged in discord Bot name:${client.user.username}`)
})

const prefix = config.prefix

client.on("message" , msg => {
    if(msg.content == "Dream Code"){
        return msg.reply("Dream Code <3")
    }
if(msg.content == prefix + "ping"){
    return msg.reply(`🏓Pong! \n Api ping:**${client.ws.ping}ms**`)
}
if(msg.content == prefix + "botinfo"){
    let botinfo = new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setThumbnail(client.user.avatarURL())
    .setDescription(`Username:${client.user.username} \n ID:${client.user.id} \n Developer:${client.users.cache.find(user => user.id == config.owner).tag}(<@${config.owner}>) \n Discord.js Version:${Discord.version} \n Quick.db Version:${db.version}`)

    msg.channel.send(botinfo)
}
})
client.login(config.token)