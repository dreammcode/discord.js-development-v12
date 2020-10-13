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
    if(!message.guild) prefix =  db.fetch(`prefix.${message.guild.id}`) || config.prefix
    if(message.guild) prefix = db.fetch(`prefix.${message.guild.id}`) || config.prefix
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return message.channel.send("You can't use commands via DMs in this bot. You can only use guild").catch(e => client.channels.cache.get("724983000286101636").send(e))
    let messageArray = message.content.split(' ').join(' ').split(" ");
    let cmd = messageArray[0]
    let args = messageArray.slice(1);

    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(!commandfile) commandfile = client.aliases.get(cmd.slice(prefix.length))
    if(commandfile) commandfile.run(client,message,args);
    
})
client.snipe = new Map()

client.on("messageDelete", async(message,channel) => {
    if(message.author.bot) return;
    if(!message.guild) return;
    client.snipe.set(message.channel.id, {
        msg:message.content,
        user:message.author.tag,
        profilephoto:message.author.displayAvatarURL(),
        image:message.attachments.first() ? message.attachments.first().proxyURL : null,
        date:message.createdTimestamp
        
    })
})

client.on("message", async message => {
    if(message.author.bot) return;
    if(!message.guild) return;
    let xpReward;
    if(client.user.id === "721417495797301370") xpReward = Math.floor(Math.random() * 6) + 7
    if(xpReward == 0) xpReward = 10
    let xp = db.fetch(`xp.${message.author.id}`)
    let level = db.fetch(`level.${message.author.id}`) || "0" //I Change xp reward because I record video :D
    let level2 = level + 1
    let levels = level2 * 1000 // level * 1000 = 5 * 1000 = 5000 xp

    if(!xp){
        db.add(`xp.${message.author.id}`,xpReward)
    }else if(xp){
        db.add(`xp.${message.author.id}`,xpReward)
    }
// I reset levels .
    if(xp > levels){
        db.add(`level.${message.author.id}`,1)
       // message.reply(`**Congratulations You Level Up On Our Server.** \n **New Level:${level2}**`)
        // if you want channel send

        client.channels.cache.get("724999684887806063").send(`<@${message.author.id}>, **Congratulations You Level Up On Our Server.** \n **New Level:${level2}**`)

    }
})

client.on("message",async message => {
    let coin = db.fetch(`coin.${message.author.id}`)
    //xD smart system

    db.add(`coin.${message.author.id}`,1)

}
)

client.login(config.token)