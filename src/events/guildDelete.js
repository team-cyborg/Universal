module.exports = {
      data: {
            name: 'guildDelete',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').Guild} guild
       */
      run: async (universal, guild) => {
            const getGuildDb = universal.guild_database.get(guild.id);

            universal.loggger.warn(`Bot left a guild: ${guild.name} (${guild.id})`);
            
            if (getGuildDb) {
                  await universal.guild_database.delete(guild.id);
                  
                  universal.loggger.warn(`Database for ${guild.name} (${guild.id}) deleted.`);
            }
      }
};