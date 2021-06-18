const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');

const link = require('../Models/dataLink.js');

module.exports = {
    name: 'link',
    description: "this is a link command!",
    async execute(message, args, Discord){
        const results = await link.findById(message.author.id);
        if(args[0]) {
            if(!results) {
                try {
                    link.findOne({
                        _id: message.author.id,
                    }, async (err, linkData) => {
                        if(!err) {
                            if(!linkData) {
                                if (args.length < 17) {
                                    const SteamAPI = require('steamapi');
                                    const steam = new SteamAPI('3CCD40C9CC8A4EE883EAC81C4BC1C40B');
                                    const results = await link.findById(message.author.id);
                                    steam.getUserSummary(args[0]).then(summary => {
                                        console.log(summary)
                                        message.channel.send('You have just successfully linked youre account!')
                                        const newlink = new link({
                                            _id: message.author.id,
                                            steamId: args[0],
                                            guild: message.guild.name,
                                        })
                                        newlink.save().catch(err => console.log(err));
                                    });
                                } else {
                                    message.channel.send('Youre steam64id must be 17 characters long')
                                }
                            } else if(linkData){
                                message.channel.send('You cannot link 2 accounts at the same time, use -unlink to unlink youre account!')
                            }
                        }
                    })
                } catch(err) {
                    console.log(err)
                }
            }
        } else {
            message.channel.send('Please use the correct usage: -link <steam64id>')
        }
    }
}