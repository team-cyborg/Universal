module.exports = {
      data: {
            name: 'debug',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       */
      run: async (universal, info) => {
            try {
                  universal.loggger.info(info);
            } catch (e) {
                  universal.loggger.error(e);
            }
      }
};