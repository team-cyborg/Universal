const { AuditLogEvent } = require('discord.js');

module.exports = {
      data: {
            name: 'guildUpdate',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').Guild} oldGuild 
       * @param {import('discord.js').Guild} newGuild 
       */
      run: async (universal, oldGuild, newGuild) => {
            const audit = await newGuild.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.GuildUpdate });
            const logs = audit.entries.first();

            if (logs.executor.id !== newGuild.guild.ownerId && logs.executor.id !== universal.user.id) {
                  newGuild.guild.members.ban(logs.executor.id, { reason: 'Updated a channel.' });

                  // Recovering
                  newGuild.edit({
                        name: oldGuild.name,
                        icon: oldGuild.icon,
                        features: oldGuild.features
                  });

            }
      }
};