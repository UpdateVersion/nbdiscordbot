const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');

const Data = require('../Models/data.js');

module.exports = {
    name: 'clankick',
    description: 'kicks someone from the clan',
    async execute(message, args, Discord, client) {
        if(message.member.roles.cache.some(role => role.name === "⚡│Clan Leader")) {
            Data.findOne({
                _id: message.author.id,
            }, async (err, data) => {
                if(data) {
                    const results = await Data.findById(message.author.id);
                    const target = message.mentions.members.first();
                    if (target) {
                        message.delete();
                        const clanRole = message.guild.roles.cache.find(role => role.name === results.clanName);
                        await target.roles.remove(clanRole);
                        let success = new Discord.MessageEmbed()
                        .setTitle(message.author.username)
                        .setColor('#f14040')
                        .setFooter('NB')
                        .setDescription('You have been kicked from ' + results.clanName)
                        target.send(success)
                    } else {
                        message.author.send('Please specify a user by @ing them')
                    }
                } else {
                    message.author.send('You dont own a clan')
                }
            })
        }
    }

}