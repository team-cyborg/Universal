const { Console } = require('console');
const { format } = require('date-and-time')

require('colors')

class Logger {
      constructor({ out, errout }) {
            if (!out || !errout) throw new Error('Logger not configured.');

            this.logger = new Console({
                  stdout: out,
                  stderr: errout,
            });

            this.timestamp = format(new Date(), 'HH:mm:ss')
      }

      /**
       * Logs info to log file
       * @param {string} message
       */
      info(message) {
            this.logger.info('%s - [%s] - %s', this.timestamp, 'INFO!', message);
            console.info('%s - [%s] - %s', this.timestamp.grey, 'INFO!'.blue, message);
      }

      /**
       * Logs warn to log file
       * @param {string} message 
       */
      warn(message) {
            this.logger.warn('%s - [%s] - %s', this.timestamp, 'WARN!', message);
            console.warn('%s - [%s] - %s', this.timestamp.grey, 'INFO!'.yellow, message);
      }

      /**
       * Logs error to log file
       * @param {string} message 
       */
      error(message) {
            this.logger.error('%s - ERROR! - %s', this.timestamp, message);
            console.error('%s - [%s] - %s', this.timestamp.grey, 'ERROR!'.red, message);
      }
}     

module.exports.Logger = Logger;