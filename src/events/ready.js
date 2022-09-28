const { ActivityType } = require('discord.js');

module.exports = {
      data: {
            name: 'ready',
            once: true
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       */
      run: async (universal) => {
            const totalUsers = universal.guilds.cache.map((g) => g.memberCount).reduce((a, c) => a + c);
            const totalGuilds = universal.guilds.cache.size;

            universal.loggger.info(`Online: ${universal.user.tag}`);
            universal.user.setActivity(`${totalUsers} users in ${totalGuilds} guilds.`, { type: ActivityType.Listening });
      }
};