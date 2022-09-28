const { join } = require('node:path');
const { UniClient } = require('./classes/Client');
const { settings } = require('./config/config');
const wait = require('node:timers/promises').setTimeout;

const Universal = new UniClient(settings.bot.opts);

(async () => {
      Universal.menu();
      await wait(5000);
      Universal.handleCommands(join(__dirname, './commands'));
      Universal.handleEvents(join(__dirname, './events'));
      Universal.start();
      Universal.deploySlashCommands(true);
})();