const winston = require('winston');

const { combine, timestamp, label, prettyPrint } = winston.format;

const logger = winston.createLogger({
      transports: [new winston.transports.File({ filename: 'test.log' }), new winston.transports.Console()],
      format: combine(label({ label: 'right meow!' }),timestamp(),prettyPrint())
});

logger.log({
      level: 'info',
      message: 'A test log',
})

logger.info('A test log')