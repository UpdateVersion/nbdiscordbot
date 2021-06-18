const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    description: 'leaderboard',
    async execute(message, args, Discord, client) {
      const { guild } = message
  
      guild.fetchInvites().then((invites) => {
        const inviteCounter = {
        }
  
        invites.forEach((invite) => {
          const { uses, inviter } = invite
          const { username, discriminator } = inviter
  
          const name = `${username}#${discriminator}`
  
          inviteCounter[name] = (inviteCounter[name] || 0) + uses
        })
  
        let replyText = 'Invites:'
  
        const sortedInvites = Object.keys(inviteCounter).sort(
          (a, b) => inviteCounter[b] - inviteCounter[a]
        )
  
        sortedInvites.length = 10
        var number = 0
        for (const invite of sortedInvites) {
            number = number+1
          const count = inviteCounter[invite]
          replyText += `\n${number}. ${invite} • ${count} invites.`
        }
        let succeedMSG = new Discord.MessageEmbed()
        .setTitle('**Invites Leaderboard**')
        .setColor('#f14040')
        .setFooter('Developed by swiss#7176')
        .setDescription(replyText)
        message.channel.send(succeedMSG)
      })
    },
  }