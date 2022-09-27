const { AuditLogEvent } = require('discord.js');

module.exports = {
      data: {
            name: 'emojiDelete',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').GuildEmoji} emoji 
       */
      run: async (universal, emoji) => {
            const audit = await emoji.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.EmojiDelete });
            const logs = audit.entries.first();

            if (logs.executor.id !== emoji.guild.ownerId && logs.executor.id !== universal.user.id) {
                  emoji.guild.members.ban(logs.executor.id, { reason: 'Deleted a Emoji.' });
            }
      }
};