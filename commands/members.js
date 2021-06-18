const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'members',
    description: "this is a members command!",
    async execute(message, args, client){
        const memberSize = message.guild.members.cache.filter((member) => !member.user.bot).size
        message.channel.send(memberSize)
    }
}