module.exports = {
      data: {
            name: 'latency',
            description: 'A latency command.'
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').Interaction} interaction
       */
      run: async (universal, interaction) => {
            const latency = Date.now() - interaction.createdTimestamp;

            await interaction.reply({
                  content: `\` My current latency is: ${latency} \``,
                  ephemeral: true
            });
      }
};