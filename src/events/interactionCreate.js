module.exports = {
      data: {
            name: 'interactionCreate',
            once: true
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       * @param {import('discord.js').Interaction} interaction
       */
      run: async (universal, interaction) => {
            const commands = universal.commands.get(interaction.commandName);

            if (!commands) return;

            try {
                  await commands.run(universal, interaction);
            } catch (e) {
                  universal.log(e);
                  await interaction.reply({ content: 'Couldn\'t execute the command.', ephemeral: true });
            }
      }
};