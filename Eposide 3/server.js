const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")
const db = require("quick.db")
const fs = require("fs");
client.on("ready", () => {
    console.log(`Logged in discord Bot name:${client.user.username}`)
})

const prefix = config.prefix
client.commands = new Discord.Collection(undefined,undefined);
client.aliases = new Discord.Collection(undefined,undefined);

fs.readdir("./cmds/", async (err, files) => {

    if(err) console.log(err)
    if(!files) return console.log("Unable to find commands.")
    let jsfile = files.filter(f => f.split(".").pop() == "js")
    if (jsfile <= 0){
        console.log("Unable to find commands.")
        return;
    }

    for (const f of jsfile){
        let props = require(`./cmds/${f}`)
        console.log(`${f} loaded.`)
        client.commands.set(props.help.name,props)
        for (const aliase of props.conf.aliase){
            client.aliases.set(aliase,props)
        }
    };
    console.log("All Commands have been loaded successfully.")
})
client.on("message" , msg => {
    if(msg.content == "Dream Code"){
        return msg.reply("Dream Code <3")
    }
    /*if(msg.content == prefix + "ping"){
        return msg.reply(`🏓Pong! \n Api ping:**${client.ws.ping}ms**`)
    }*/
    if(msg.content == prefix + "botinfo"){
        let botinfo = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setThumbnail(client.user.avatarURL())
            .setDescription(`Username:${client.user.username} \n ID:${client.user.id} \n Developer:${client.users.cache.find(user => user.id == config.owner).tag}(<@${config.owner}>) \n Discord.js Version:${Discord.version} \n Quick.db Version:${db.version}`)

        msg.channel.send(botinfo)
    }
})


client.on("message", async message => {
    if(message.author.bot) return;
    let prefix;
    if(!message.guild) prefix = "!"
    if(message.guild) prefix = config.prefix
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return message.channel.send("You can't use commands via DMs in this bot. You can only use guild").catch(e => client.channels.cache.get("724983000286101636").send(e))
    let messageArray = message.content.split(' ').join(' ').split(" ");
    let cmd = messageArray[0]
    let args = messageArray.slice(1);

    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(!commandfile) commandfile = client.aliases.get(cmd.slice(prefix.length))
    if(commandfile) commandfile.run(client,message,args);

})
client.login(config.token)