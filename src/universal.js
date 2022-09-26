const { UniClient } = require('./classes/Client');
const { settings } = require('./config/config');

const Universal = new UniClient(settings.bot.opts);

try {
      Universal.start();
      Universal.deploySlashCommands(false);
} catch (e) {
      Universal.log(e);
}