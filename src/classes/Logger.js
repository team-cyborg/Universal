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

            this.timestamp = format(new Date(), 'YYYY/MM/DD HH:mm:ss')
      }

      /**
       * Logs info to log file
       * @param {string} message
       */
      info(message) {
            this.logger.info('%s - INFO! - %s', this.timestamp, message);
            console.info('%s - INFO! - %s', this.timestamp, message);
      }

      /**
       * Logs warn to log file
       * @param {string} message 
       */
      warn(message) {
            this.logger.warn('%s - WARN! - %s', this.timestamp, message);
            console.warn('%s - WARN! - %s', this.timestamp, message);
      }

      /**
       * Logs error to log file
       * @param {string} message 
       */
      error(message) {
            this.logger.error('%s - ERROR! - %s', this.timestamp, message);
            console.error('%s - ERROR! - %s', this.timestamp, message);
      }
}     

module.exports.Logger = Logger;