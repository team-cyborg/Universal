const { AuditLogEvent } = require('discord.js');

module.exports = {
      data: {
            name: 'guildBanAdd',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').GuildMember} member 
       */
      run: async (universal, member) => {
            const audit = await member.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.MemberBanAdd });
            const logs = audit.entries.first();
            
            if (logs.executor.id !== member.guild.ownerId && logs.executor.id !== universal.user.id) {
                  member.guild.members.ban(logs.executor.id, { reason: 'Banned a user.' });
                  member.guild.members.unban(logs.target.id);
            }
      }
};