const { MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');

const link = require('../Models/dataLink.js');

module.exports = {
    name: 'unlink',
    description: "this is a unlink command!",
    async execute(message, args, Discord){
        try {
            link.findOne({
                _id: message.author.id,
            }, async (err, linkData) => {
                if(!err) {
                    if(linkData) {
                        const results = await link.findById(message.author.id);
                        message.channel.send('You have just successfully unlinked youre account!')
                        const linkSchema = require('../models/dataLink');
                        await linkSchema.deleteOne({ _id: message.author.id, steamId: results.steamId})
                    } else if(!linkData){
                        message.channel.send('You currently do not have a account linked, use -link <steam64id>')
                    }
                }
            })
        } catch(err) {
            console.log(err)
        }
    }
}