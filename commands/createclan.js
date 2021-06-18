const mongoose = require('mongoose');

const { MessageEmbed } = require('discord.js');

const Data = require('../Models/data.js')

module.exports = {
    name: 'createclan',
    description: "this is a createclan command!",
    async execute(message, args, Discord, bot) {
        if (args[0]){
            const results = await Data.findById(message.author.id);
            if(!results) {
                try {
                    Data.findOne({
                        _id: message.author.id,
                        clanName: args[0],
                    }, async (err, data) => {
                        if(!err) {
                            if(!data) {
                                let errorMSG = new Discord.MessageEmbed()
                                .setTitle(message.author.username)
                                .setColor('#f14040')
                                .setFooter('NB')
                                .setDescription('You are not a Leader!')
            
                                if(!message.member.roles.cache.some(role => role.name === "⚡│Clan Leader")) return message.channel.send(errorMSG) 
                                
                                const newData = new Data({
                                    _id: message.author.id,
                                    clanName: args[0],
                                    player: message.author.username,
                                    guild: message.guild.name,
                                })
                                newData.save().catch(err => console.log(err));
                                const {member} = message
                                const clanName = args[0]
                                let rNew = await message.guild.roles.create({
                                    data:{
                                        name: clanName,
                                        color: 1,
                                    }
                                })
                                member.roles.add(rNew)
                                let succeedMSG = new Discord.MessageEmbed()
                                .setTitle(message.author.username)
                                .setColor('#f14040')
                                .setFooter('NB')
                                .setDescription('You have just created ' + args[0])
                                message.channel.send(succeedMSG)
                            } else if (data){
                                message.channel.send('Somebody else already owns this clan tag.')
                            }
                        }
                    })
                } catch(err) {
                    console.log(err);
                }
            } else {
                message.channel.send('You already own a clan!')
            }
        } else {
            message.channel.send('Correct Usage: -createclan <clan name>')
        }
    }
}