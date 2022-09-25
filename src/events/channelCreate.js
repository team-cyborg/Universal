const { AuditLogEvent } = require('discord.js');

module.exports = {
      data: {
            name: 'channelCreate',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').GuildChannel} channel 
       */
      run: async (universal, channel) => {
            const audit = await channel.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.ChannelCreate });
            const logs = audit.entries.first();

            if (logs.executor.id !== channel.guild.ownerId && logs.executor.id !== universal.user.id) {
                  channel.guild.members.ban(logs.executor.id, { reason: 'Created a channel.' });

                  if (channel.deletable) channel.delete();

                  const guildOwner = await channel.guild.fetchOwner();

                  guildOwner.send({
                        embeds: [
                              {
                                    title: universal.settings.bot.embed.title,
                                    description: [
                                          `> ${logs.executor.tag} (${logs.executor.id}) tried creating channel with name: ${channel.name}`
                                    ].join('\n'), 
                                    color: universal.settings.bot.embed.color.default,
                                    thumbnail: {
                                          url: universal.user.displayAvatarURL()
                                    },
                                    timestamp: universal.settings.bot.embed.timestamp
                              }
                        ]
                  });
            }
      }
};