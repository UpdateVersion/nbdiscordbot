const mongoose = require('mongoose');

const { MessageEmbed } = require('discord.js');

const Data = require('../Models/data.js')

module.exports = {
    name: 'invite',
    description: 'used to invite people to clan',
    async execute(message, args, Discord, client) {
        if(message.member.roles.cache.some(role => role.name === "⚡ | Clan Leader")) {
            Data.findOne({
                _id: message.author.id,
            }, async (err, data) => {
                if(data) {
                    const results = await Data.findById(message.author.id);
                    const target = message.mentions.members.first();
                    if (target) {
                        // const link = await linkData.findById(target.id);
                        // if(!link.steamId) return;
                        message.delete();
                        const newPlayer = target.user.username
                        const linkData = require('../Models/dataLink')
                        const link = await linkData.findById(target.id);
                        linkData.findOne({
                            _id: target.id,
                        }, async (err, link) => {
                            if(link.steamId === null) return message.channel.send(`${target.user.username} needs to link his account using -link <steam64id>`);
                            const newDataPlayer = await Data.findOneAndUpdate(
                                {
                                    player: `${results.player},` + ` ${newPlayer}`,
                                }
                            )
                            const clanRole = message.guild.roles.cache.find(role => role.name === results.clanName);
                            await target.roles.add(clanRole);
                            let success2 = new Discord.MessageEmbed()
                            .setTitle(target.username)
                            .setColor('RANDOM')
                            .setFooter('NB')   
                            .setDescription('You have just joined ' + results.clanName)
                            target.send(success2);
                        })
                        // message.delete();
                        // const joinaccept = '✅';
                        // let success = new Discord.MessageEmbed()
                        // .setTitle(target.username)
                        // .setColor('RANDOM')
                        // .setFooter('NB')
                        // .setDescription('You have been invited to join ' + results.clanName + '\n\nReact the ✅ to join!')
                        // let successEmbed = await target.send(success);
                        // successEmbed.react(joinaccept);
                        // client.on('messageReactionAdd', async (reaction, user) => {
                        //     const target = message.mentions.members.first();
                        //     if (reaction.message.partial) await reaction.message.fetch();
                        //     if (reaction.partial) await reaction.fetch();
                        //     // if (client.user) return;
                        //     message.guild.members.cache.filter((member) => !member.user.bot)
                        //     {
                        //         console.log(target);
                        //         if (reaction.emoji.name === joinaccept) {
                        //             const clanRole = message.guild.roles.cache.find(role => role.name === results.clanName);
                        //             await target.roles.add(clanRole);
                        //             let success2 = new Discord.MessageEmbed()
                        //             .setTitle(target.username)
                        //             .setColor('RANDOM')
                        //             .setFooter('NB')   
                        //             .setDescription('You have just joined ' + results.clanName)
                        //             target.send(success2);
                        //             // reaction.users.remove(user.bot)
                        //         } else {
                        //             return;
                        //         }
                        //     }
                 
                        // });
                    } else {
                        message.author.send('Please specify a user by @ing them')
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