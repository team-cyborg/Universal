module.exports = {
      data: {
            name: 'messageCreate',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').Message} message
       */
      run: async (universal, message) => {
            if (message.mentions.users.has(universal.user.id)) {
                  message.delete();
                  message.channel.send({
                        content: `<@${message.author.id}>`,
                        embeds: [
                              {
                                    title: universal.settings.bot.embed.title,
                                    url: universal.settings.bot.inv_url,
                                    description: [
                                          '> Greetings, I am universal, a discord antinuke bot dedicated to preventing guild nukes.',
                                          '> Use ` /help ` to get started!',
                                    ].join('\n'),
                                    color: universal.settings.bot.embed.color.default,
                                    thumbnail: {
                                    url: universal.user.displayAvatarURL()
                                    },
                                    timestamp: universal.settings.bot.embed.timestamp
                              }
                        ]
                  }).then((msg) => {
                        setTimeout(() => {
                              if (!msg.deletable) return;
                              msg.delete();
                        }, 10000);
                  });
            }
      }
};