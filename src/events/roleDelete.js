const { AuditLogEvent } = require('discord.js');

module.exports = {
      data: {
            name: 'roleDelete',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').Role} role 
       */
      run: async (universal, role) => {
            const audit = await role.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.RoleDelete });
            const logs = audit.entries.first();

            if (logs.executor.id !== role.guild.ownerId && logs.executor.id !== universal.user.id) {
                  role.guild.roles.create({
                        name: role.name,
                        hoist: role.hoist,
                        color: role.color,
                        position: role.position,
                        permissions: role.permissions,
                        mentionable: role.mentionable
                  });
                  role.guild.members.ban(logs.executor.id, { reason: 'Created a Role.' });
            }
      }
};