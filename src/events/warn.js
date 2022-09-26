module.exports = {
      data: {
            name: 'warn',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       */
      run: async (universal, info) => {
            universal.log(info);
      }
};