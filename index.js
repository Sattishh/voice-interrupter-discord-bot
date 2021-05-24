const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
const fs = require('fs')
let bot_token = null;
let target_userID = null;
let annoying_sound = null;

const data = JSON.parse(fs.readFileSync('config.json', 'utf8'));
bot_token = data.discord_token;
if (bot_token === "BOT TOKEN HERE") console.log('ENTER THE BOT TOKEN INTO CONFIG.JSON! (https://discord.com/developers/applications)')
target_userID = data.target_userID;
if (target_userID === "USERID HERE") console.log('ENTER THE TARGET\'s USER ID INTO CONFIG.JSON! (Turn on Developer Mode)')
annoying_sound = data.annoying_sound;
if (annoying_sound === "amogus.mp3") console.log("NO NEW SOUND INPUTTED. USING DEFAULT ANNOYING SOUND!")

bot.on("ready", async () => {
    console.log("Ready to disturb someone.")
});

bot.on("voiceStateUpdate", (oldState, newState) => {
    let newUserChannel = newState.channel
    let oldUserChannel = oldState.channel

    if (oldUserChannel === null && newUserChannel !== undefined) {

        if (newState.member.id === target_userID) {
            newState.channel.join();
        }
    } else if (newUserChannel === null) {
        oldState.channel.leave();
    }

})

bot.on("guildMemberSpeaking", async (member, speaking) => { 
      
    if (member.id === target_userID) {
      
            if (speaking.bitfield) {
            const voiceChannel = member.voice.channel;
            voiceChannel.join().then(connection => {
            connection.play(`./${annoying_sound}`)
                 
            })
        } else {
            member.voice.channel.join().then(connection => {
                connection.play('./silence.mp3')
            })
        }
        } else {
            member.voice.channel.join().then(connection => {
                connection.play('./silence.mp3')
            })
        }
    
});

bot.login(bot_token)