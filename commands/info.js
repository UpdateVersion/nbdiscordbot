const mongoose = require('mongoose');

const { MessageEmbed } = require('discord.js');

const Data = require('../Models/data.js')

module.exports = {
    name: 'info',
    description: 'used to invite people to clan',
    async execute(message, args, Discord, client) {
        if(message.member.roles.cache.some(role => role.name === "⚡│Clan Leader")) {
            const results = await Data.findById(message.author.id);
            Data.findOne({
                _id: message.author.id,
            }, async (err, data) => {
                if(data) {
                    if (message.guild.roles.cache.find(role => role.name === results.clanName)) {
                        let role = message.guild.roles.cache.find(role => role.name === results.clanName)

                        let success = new Discord.MessageEmbed()
                        .setAuthor(`${results.clanName}`)
                        .setColor('#f14040')
                        .setFooter('NB')
                        .setDescription(role.members.map(member => member.user.username).join("\n"))
                        .setTimestamp()
                        .setFooter('Developed by swiss#7176')
                        message.channel.send(success);
                    }
                } else {
                    message.author.send('You dont own a clan! Create one using -createclan <name>');
                }
            })
        } else {
            message.author.send('You dont have the correct permissions to do this!')
        }

    }
}