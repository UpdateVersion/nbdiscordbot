const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clanhelp',
    description: 'kicks someone from the clan',
    async execute(message, args, Discord, client) {
    
        let embed = new Discord.MessageEmbed()
        .setColor('#f14040')
        .setTitle('Clanhelp')
        .setFooter('Developed by swiss#7176')
        .setDescription(''
        + '-createclan <Name> | Creates a clan\n'
        + '-clankick <@User> | Kicks someone from the clan\n'
        + '-invite <@User> | Invites someone to the clan\n'
        + '-info | Shows how many members are in youre clan and their names\n'
        + '-link <steam64id> | Links youre steam64id to youre discord account\n'
        + '-unlink | Unlinks youre steam64id from youre discord account\n'
        + '-disband | Disbands the current clan\n')

         
        
        message.channel.send(embed);
    }
}