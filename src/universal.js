const { UniClient } = require('./classes/Client');
const { settings } = require('./config/config');

const Universal = new UniClient(settings.bot.opts);

Universal.start();
Universal.deploySlashCommands(true);
// Universal.server();