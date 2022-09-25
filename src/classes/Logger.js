const winston = require('winston');
require('colors');

class Logger {
      constructor(LogFile) {
            this.logger = winston.createLogger({
                  transports: [
                        new winston.transports.File({ filename: LogFile })
                  ]
            });
      }

      log(info) {
            const D = new Date();
            const time = [D.getHours(), D.getMinutes(), D.getSeconds()];
            const date = [D.getDate(), D.getMonth(), D.getFullYear()];

            const today = ''.concat(time.join(':'), ' - ', date.join(':'));

            this.logger.log({
                  level: 'info',
                  message: `[${today}] :: ${info}`
            });

            // eslint-disable-next-line no-console
            console.log(`[${today}] :: ${info}`);
      }
}     

module.exports.Logger = Logger;