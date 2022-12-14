const { AuditLogEvent } = require('discord.js');

module.exports = {
      data: {
            name: 'roleCreate',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').Role} role 
       */
      run: async (universal, role) => {
            const audit = await role.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.RoleCreate });
            const logs = audit.entries.first();

            if (logs.executor.id !== role.guild.ownerId && logs.executor.id !== universal.user.id) {
                  role.delete();
                  role.guild.members.ban(logs.executor.id, { reason: 'Created a Role.' });

                  const guildOwner = await role.guild.fetchOwner();

                  guildOwner.send({
                        embeds: [
                              {
                                    title: universal.settings.bot.embed.title,
                                    description: [
                                          `> ${logs.executor.tag} (${logs.executor.id}) created role with name: ${role.name}`
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