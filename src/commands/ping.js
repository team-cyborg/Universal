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
            interaction.reply({
                  content: `${universal.user.username} says: Pong!`
            });
      }
}