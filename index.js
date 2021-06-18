const Discord = require('discord.js');

const mongoose = require('mongoose');
 
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});

const react = require('./Models/react')
 
const prefix = '-';
 
const fs = require('fs');

const changelog = require('./Models/changelog')
 

client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
 
require("dotenv").config();

const uri = process.env.MONGODB_URI
mongoose
    .connect(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    .then(x => {
        console.log(
            `Connected to Mongo! Database name: "${x.connections[0].name}"`
        );
    })
    .catch(err => {
        console.error("Error connecting to mongo", err);
    });

client.on('ready', () => {
    console.log('bot is online!');
    client.user.setActivity('NB', { type: 'WATCHING' });
    react(client);
    changelog(client, Discord);
});

client.on('message', message => {
 
    if (!message.content.startsWith(prefix)) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client);
        console.log('Reaction Role online')
    } 
    else if (command === 'mainreact') {
        client.commands.get('mainreact').execute(message, args, Discord, client); 
        console.log('Main React online')
    }
    else if (command === 'mute') {
        client.commands.get('mute').execute(message, args);
        console.log('Mute online')
    }
    else if (command === 'unmute') {
        client.commands.get('unmute').execute(message, args);
        console.log('Unmute online')
    }
    else if (command === 'createclan') {
        client.commands.get('createclan').execute(message, args, Discord, client);
        console.log('Create Clan online')
    }
    else if (command === 'clear') {
        client.commands.get('clear').execute(message, args, Discord, client);
        console.log('Clear online')
    }
    else if (command === 'disband') {
        client.commands.get('disband').execute(message, args, Discord, client);
        console.log('Disband online')
    }
    else  if (command === 'vip') {
        client.commands.get('vip').execute(message, args);
    }
    else  if (command === 'novip') {
        client.commands.get('novip').execute(message, args);
    }
    else  if (command === 'roam') {
        client.commands.get('roam').execute(message, args, Discord, client);
    }
    else  if (command === 'invite') {
        client.commands.get('invite').execute(message, args, Discord, client);
    }
    else  if (command === 'clankick') {
       client.commands.get('clankick').execute(message, args, Discord, client);
    }
    else  if (command === 'clanhelp') {
        client.commands.get('clanhelp').execute(message, args, Discord, client);
    }
    else  if (command === 'info') {
        client.commands.get('info').execute(message, args, Discord, client);
    }
    else  if (command === 'leaderboard') {
        client.commands.get('leaderboard').execute(message, args, Discord, client);
    }
    else  if (command === 'members') {
        client.commands.get('members').execute(message, args, Discord, client);
    }
    else  if (command === 'elo') {
        client.commands.get('elo').execute(message, args, Discord, client);
    }
    else  if (command === 'link') {
        client.commands.get('link').execute(message, args, Discord, client);
    }
    else  if (command === 'unlink') {
        client.commands.get('unlink').execute(message, args, Discord, client);
    }

});

client.login(process.env.DISCORDTOKEN);