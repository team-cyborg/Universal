module.exports = {
      data: {
            name: 'error',
            once: false
      },

      /**
       * 
       * @param {import('../classes/Client').UniClient} universal 
       */
      run: (universal, error) => {
            universal.loggger.error(error);
      }
};