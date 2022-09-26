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
                  universal.log(info);
            } catch (e) {
                  universal.log(e);
            }
      }
};