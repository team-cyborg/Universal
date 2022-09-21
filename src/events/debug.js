module.exports = {
      data: {
            name: 'debug',
            once: true
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       */
      run: async (universal, info) => {
            universal.log(info);
      }
}