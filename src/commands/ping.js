module.exports = {
      data: {
            name: 'ping',
            description: 'A ping pong command.'
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').Interaction} interaction
       */
      run: async (universal, interaction) => {
            await interaction.deferReply();
            await universal.wait(1000);
            await interaction.reply({
                  content: `\` My current latency is: ${universal.ws.ping} \``
            });
      }
};