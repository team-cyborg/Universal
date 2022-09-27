const { AuditLogEvent } = require('discord.js');

module.exports = {
      data: {
            name: 'roleUpdate',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').Role} oldRole 
       * @param {import('discord.js').Role} newRole 
       */
      run: async (universal, oldRole, newRole) => {
            const audit = await newRole.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.RoleUpdate });
            const logs = audit.entries.first();
            
            if (logs.executor.id !== newRole.guild.ownerId && logs.executor.id !== universal.user.id) {
                  newRole.setPermissions(oldRole.permissions);
                  newRole.guild.members.ban(logs.executor.id, { reason: 'Updated a role.' });
            }
      }
};