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

            await interaction.deferReply();
            await universal.wait(2000);
            await interaction.reply({
                  content: `\` My current latency is: ${latency} \``
            });
      }
}; 