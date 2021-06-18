module.exports = (client, Discord) => {
    client.on('message', async (message) => {
        if (message.channel.name.includes('📚│logs')) {
            if (message.author.bot) return;
            message.delete();
            let success = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username}`)
            .setColor('#4084b8')
            .setDescription('\n\n\n\n\n**NB Changes**\n'
                + message.content + `\n\n`
                + `**Have Feedback?**\n`
                + `Have an idea or feedback? Check out #suggestions and share your ideas!`)
            .setTimestamp()
            .setFooter('Developed by swiss#7176')
            message.channel.send(success);
        }
    });
}