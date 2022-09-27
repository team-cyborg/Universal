const { AuditLogEvent } = require('discord.js');

module.exports = {
      data: {
            name: 'guildMemberRemove',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').GuildMember} member 
       */
      run: async (universal, member) => {
            const audit = await member.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.MemberKick });
            const logs = audit.entries.first();
            
            if (logs.executor.id !== member.guild.ownerId && logs.executor.id !== universal.user.id) {
                  if (!logs.target.bot) return;
                  
                  member.guild.members.ban(logs.executor.id, { reason: 'Added a bot.' });
                  member.guild.members.ban(logs.target.id, { reason: 'AntiBot.' });
            }
      }
};