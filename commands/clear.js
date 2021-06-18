const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'clear',
    description: "this is a clear command!",
    async execute(message, args){
        if(message.member.roles.cache.some(role => role.name === "Staff")){
            message.delete();
            await message.channel.messages.fetch({limit: args[0]}).then(messages => {
                message.channel.bulkDelete(messages);
            });

        } else {
            message.author.send(`You cant send this command because you dont have the right permissions`);
            message.delete();
        }
    }
}