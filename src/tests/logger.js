const { Console } = require('console');
const fs = require('fs');

const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
// Custom simple logger
const logger = new Console({ stdout: output, stderr: errorOutput });
// use it like console
const count = 5;
const time = new Date();
const t = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();

logger.log('INFO! count: %d', count);
logger.error('ERROR! (%s) - %s', time, 'A error for you!')
logger.warn('WARN! (%s) - %s', time, 'A error for you!')