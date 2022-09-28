module.exports = {
      data: {
            name: 'latency',
            description: 'A latency command.'
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').CommandInteraction} interaction
       */
      run: async (universal, interaction) => {
            const latency = Date.now() - interaction.createdTimestamp;

            try {
                  await interaction.reply({
                        embeds: [
                              universal.utilities.createBasicEmbed({
                                    title: universal.settings.bot.embed.title,
                                    desc: `> My latency is: ${latency}ms!`,
                                    url: universal.settings.bot.inv_url,
                                    color: universal.settings.bot.embed.color.default,
                                    thumbnail: universal.user.displayAvatarURL(),
                              })
                        ],
                        ephemeral: true
                  });
            } catch (e) {
                  universal.loggger.error(e);
            }
      }
}; 