const mongoose = require('mongoose');

const { MessageEmbed } = require('discord.js');

const Data = require('../Models/data.js')

module.exports = {
    name: 'disband',
    description: "this is a disband command!",
    async execute(message, args, Discord, client) {
        const results = await Data.findById(message.author.id);
        Data.findOne({
            _id: message.author.id,
            // clanName: results.clanName,
        }, async (err, data) => {
            if(data) {


                if(!message.member.roles.cache.some(role => role.name === "⚡│Clan Leader"));



                const dataSchema = require('../models/data');
                await dataSchema.deleteOne({ _id: message.author.id, clanName: results.clanName})
                console.log('User with ID ' + message.author.id + ' clan has been deleted from our database')


                let guild = message.guild;
                let roleDelete = message.guild.roles.cache.find(role => role.name == results.clanName)
                roleDelete.delete();



                let success = new Discord.MessageEmbed()
                .setTitle(message.author.username)
                .setColor('#000000')
                .setFooter('NB')
                .setDescription('You have just disbanded your clan!')
                message.channel.send(success)



            } else {


                let errorMSG = new Discord.MessageEmbed()
                .setTitle(message.author.username)
                .setColor('#000000')
                .setFooter('NB')
                .setDescription('There is no clan linked to your discord ID')
                message.channel.send(errorMSG)


            }
        })
    }
}
