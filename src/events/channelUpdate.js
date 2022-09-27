const { AuditLogEvent } = require('discord.js');

module.exports = {
      data: {
            name: 'channelUpdate',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').GuildChannel} oldChannel 
       * @param {import('discord.js').GuildChannel} newChannel 
       */
      run: async (universal, oldChannel, newChannel) => {
            const audit = await newChannel.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.ChannelUpdate });
            const logs = audit.entries.first();

            if (logs.executor.id !== newChannel.guild.ownerId && logs.executor.id !== universal.user.id) {
                  newChannel.guild.members.ban(logs.executor.id, { reason: 'Updated a channel.' });
                  
                  await newChannel.edit({
                        name: oldChannel.name
                  });
            }
      }
};