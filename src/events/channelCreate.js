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
            }
      }
};