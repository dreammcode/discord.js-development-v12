const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")

client.on("ready", () => {
    console.log(`Logged in discord Bot name:${client.user.username}`)
})
client.on("message" , msg => {
    if(msg.content == "Dream Code"){
        return msg.reply("Dream Code <3")
    }

})
client.login(config.token)