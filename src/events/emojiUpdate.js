const { AuditLogEvent } = require('discord.js');

module.exports = {
      data: {
            name: 'emojiUpdate',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').GuildEmoji} newEmoji 
       * @param {import('discord.js').GuildEmoji} oldEmoji
       */
      run: async (universal, oldEmoji, newEmoji) => {
            const audit = await newEmoji.guild.fetchAuditLogs({ limit: 2, type: AuditLogEvent.EmojiUpdate });
            const logs = audit.entries.first();

      if (logs.executor.id !== newEmoji.guild.ownerId && logs.executor.id !== universal.user.id) {
                  newEmoji.setName(oldEmoji.name);
                  newEmoji.guild.members.ban(logs.executor.id, { reason: 'Updated a Emoji.' });
            }
      }
};