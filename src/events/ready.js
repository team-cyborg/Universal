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
            universal.log(`Online: ${universal.user.tag}`);
            universal.deploySlashCommands(false);
      }
};