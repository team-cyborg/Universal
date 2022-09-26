module.exports = {
      data: {
            name: 'join-count',
            description: 'Shows the server list'
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').Interaction} interaction
       */
      run: async (universal, interaction) => {
            const { team } = universal.settings.bot;
            // eslint-disable-next-line prefer-const
            let info = [];

            
            universal.guilds.cache.forEach((guild) => {
                  info.push(`GuildName: ${guild.name} (${guild.memberCount} members!)`);
            });
            
            
            if (!team.includes(interaction.user.id)) return;

            await interaction.deferReply();
            await universal.wait(1000);
            await interaction.reply({
                  content: [
                        '```fix',
                        info.join('\n'),
                        '```'
                  ].join('\n')
            });
            
      }
};